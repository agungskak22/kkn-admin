<template>
  <div>
      <div class="breadcrumbs-box">
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <div style="padding:40px">  
        <v-card style="margin-top:20px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);">
          <div style="padding:20px">
            <h2 class="text-md-center">Data Bangunan Publik</h2>
            <v-layout row wrap style="margin:10px">
              <v-flex xs12 md9>
                <v-text-field
                    v-model="keyword"
                    outlined
                    label="Search"
                    height="48"
                    prepend-inner-icon="mdi-magnify"
                    color="#E4E4E4"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md3 class="text-right">
                  <v-btn
                  depressed
                  dark
                  color = "#007EFF"
                  height="56"
                  @click="$router.push({ name : 'newPublic' })"
                  >
                      Tambah Bangunan
                  </v-btn> 
              </v-flex>
            </v-layout>

            <v-data-table
                :headers="headers"
                :items="publics"
                :search="keyword"
                :loading="load"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="(item,index) in items" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.identity }}</td>
                      <td>{{ item.construction_year}}</td>
                      <td>{{ item.construction_size}}</td>
                      <td>{{ item.function}}</td>
                      <td class="text-center">
                        <v-btn 
                          icon
                          color="indigo"
                          light
                          @click="$router.push({ name : 'publicEdit',params:{public: item.id}})"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn 
                          icon
                          color="error"
                          light
                          @click="showDeleteDialog(item.id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
          </div>
        </v-card>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title
              class="headline"
              primary-title
              style="background-color:#414550;color:#ffff;height:70px"
            >
              Konfirmasi Hapus
            </v-card-title>
            <v-card-text style="padding-top:24px">
              <v-container>
                <div style="padding:16px">
                  <div class="delete-warning">
                    Apakah anda yakin ingin menghapus data ini?
                  </div>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                dark
                color = "#A0A4A8"
                class="btn-style"
                style="width: 160px;
                height: 48px;"
                @click="dialogDelete = false"
              >
                  Tidak
              </v-btn>
              <v-btn
                depressed
                dark
                color = "#EB5757"
                class="btn-style"
                style="width: 160px;
                height: 48px;"
                @click="deletePublic()"
              >
                  Ya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-snackbar
          v-model="snackbar"
          :color="color"
          :multi-line="true"
          :timeout="3000"
        >
          {{ text }}
          <v-btn
            dark
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        breadcrumbs: [
          {
            text: 'Dashboard',
            exact : true,
            to: { name: 'home' },
          },
          {
            text: 'Public',
            exact : false,
            to: { name: 'public' },
          },
        ],
        headers: [
            {
              text: 'No',
              value: 'no',
            },
            {
              text: 'Identitas',
              value: 'identity'
            },
            {
              text: 'Tahun Buat',
              value: 'construction_year'
            },
            {
              text: 'Luas Bangunan',
              value: 'construction_size'
            },
            {
              text: 'Fungsi',
              value: 'function  '
            },
            {
              text: 'Aksi',
              value: null
            },
        ],
        id : null,
        keyword: "",
        owner:{},
        ownerId: null,
        livestocks:[],
        lands:[],
        houses:[],
        publics:[],
        snackbar: false, 
        color: null,
        text: '',
        inset: false, 
        load: false,
        users: [],
        dialog : false,
        dialogDelete : false,
        name : '',
        newData : true,
        form : {
           identity : null,
           type : null,
           owner : null,
           address : null,
           function : null,
           construction_year : null,
           construction_size : null,
           land_size : null,
           number_of_bathrooms : null,
           genset : null,
           water_sources : null,
           reservoir_size : null,
           width_of_building_entrance : null,
           fillColor : null,
           strokeColor : null,
           disaster_status : null,
        }, 
        buildings:[],
        showColor1:false,
        showColor2:false,
        center: { lat:-7.779047, lng: 110.416957 },
        optionmaps : {
          scrollwheel: false, mapTypeControl: false, draggable: false, disableDoubleClickZoom: true,zoomControl: false                      
        },
        optionmaps2 : {
          scrollwheel: true, mapTypeControl: true, draggable: true, disableDoubleClickZoom: false,zoomControl: true, clickableIcons: false                     
        },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
        allPaths: [],
        mode: 'hexa',
        marker: false,
        choices : ["Ya","Tidak"],
        waters : ["Sumur","PDAM"],
        types : ["Bangunan Publik"],
        functions : ["Kantor Polisi","Balai Desa","Balai Dusun","Balai RT","Balai RW","Puskesmas","Lainnya"],
        date: new Date().toISOString().substr(0, 10),
        disasterStatus : ["rendah","sedang","tinggi"],
        modal: false,
        edited: false,
        title: 'MASUKAN DATA BANGUNAN',
        typeInput: 'new',
        mapMode: false,
    }
  },
  methods:{
      getData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.load = true
        var uri = this.$apiurl + '/publicbuilding';
            this.$http.get(uri,config).then(response =>{
                this.publics=response.data.data;
                this.load = false
            }
        )
      },
      deletePublic()
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiurl + '/publicbuilding/' + this.id;
            this.$http.delete(uri,config).then(response =>{
              this.snackbar = true; //mengaktifkan snackbar
              this.color = 'green'; //memberi warna snackbar
              this.text = 'Berhasil'; //memasukkan pesan ke snackbar
              console.log(response)
              this.dialogDelete = false
              this.getData();
            }).catch(error =>{
              this.snackbar = true;
              this.text = error.response.data.message;
              this.color = 'red';
              this.load = false;
          })
      },
      showDeleteDialog(id){
        this.id = id
        this.dialogDelete = true
      },
      showEditDialog(form){
        this.form = form
        this.dialog = true
        this.newData = false
      },
      reset(){
        this.newData = true
        this.form = {
          name : null,
          email : null,
          password : null,
          village : null,
          unit : null,
          dpl : null,
          adpl : null
        }
      }
  },
  mounted(){
    this.getData();
  },
}
</script>

<style lang="scss">
.breadcrumbs-box{
  background: #FFFFFF;
  height: 64px;
  width: 100%;
  padding: 8px;
}
.delete-warning{
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;

  /* Gray 2 */

  color: #4F4F4F;
}
.delete-info{
  margin-top: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */


  /* color/inactive */

  color: #A0A4A8;
}
</style>> 


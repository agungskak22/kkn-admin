<template>
  <div style="padding:40px">  
    <v-card style="margin-top:20px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);">
      <div style="padding:20px">
        <h2 class="text-md-center">Data Pengguna</h2>
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
              @click="reset(),dialog = true"
              >
                  Tambah Pengguna
              </v-btn> 
          </v-flex>
        </v-layout>

        <v-data-table
            :headers="headers"
            :items="users"
            :search="keyword"
            :loading="load"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item,index) in items" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.unit}}</td>
                  <td>{{ item.village}}</td>
                  <td>{{ item.dpl}}</td>
                  <td>{{ item.adpl}}</td>
                  <td class="text-center">
                    <v-btn 
                      icon
                      color="indigo"
                      light
                      @click="showEditDialog(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn 
                      icon
                      color="error"
                      light
                      @click="showDeleteDialog(item.name,item.id)"
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
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title
          class="headline"
          primary-title
          style="background-color:#414550;color:#ffff;height:70px"
        >
          Tambah User Baru
        </v-card-title>
        <v-card-text style="padding-top:24px">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" style="padding-top:0px;padding-bottom:0px">
                <v-text-field
                    v-model="form.name"
                    outlined
                    label="Nama Kelompok"
                    color="indigo"
                    light
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" style="padding-top:0px;padding-bottom:0px">
                <v-text-field
                    v-model="form.email"
                    outlined
                    label="Email"
                    color="indigo"
                    light
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" style="padding-top:0px;padding-bottom:0px">
                <v-text-field
                    v-model="form.village"
                    outlined
                    label="Nama Padukuhan"
                    color="indigo"
                    light
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" style="padding-top:0px;padding-bottom:0px">
                <v-text-field
                    v-model="form.unit"
                    outlined
                    label="Nama Unit"
                    color="indigo"
                    light
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" style="padding-top:0px;padding-bottom:0px">
                <v-text-field
                    v-model="form.adpl"
                    outlined
                    label="Nama ADPL"
                    color="indigo"
                    light
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" style="padding-top:0px;padding-bottom:0px">
                <v-text-field
                    v-model="form.dpl"
                    outlined
                    label="Nama DPL"
                    color="indigo"
                    light
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.role"
                  :items="roles"
                  label="Role"
                  outlined
                  light
              ></v-select>
              </v-col>
              <v-col cols="12" style="padding-top:20px;padding-bottom:0px">
                <v-btn  @click="register()" block color="#007EFF" height="52" depressed dark>Input Data</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
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
              <div class="delete-info">
                  User dengan nama "{{ name }}" akan terhapus secara permanen
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
            @click="deleteUser()"
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
</template>

<script>
export default {
  data () {
    return {
        headers: [
            {
              text: 'No',
              value: 'no',
            },
            {
              text: 'Nama',
              value: 'name'
            },
            {
              text: 'Unit',
              value: 'unit'
            },
            {
              text: 'Padukuhan',
              value: 'village'
            },
            {
              text: 'DPL',
              value: 'dpl'
            },
              {
              text: 'ADPL',
              value: 'adpl'
            },
            {
              text: 'Aksi',
              value: null
            },
        ],
        form : {
          name : null,
          email : null,
          password : null,
          village : null,
          unit : null,
          dpl : null,
          adpl : null,
          role : null
        },
        roles : ["general","admin"],
        id : null,
        keyword: "",
        owner:{},
        ownerId: null,
        livestocks:[],
        lands:[],
        houses:[],
        snackbar: false, 
        color: null,
        text: '',
        inset: false, 
        load: false,
        users: [],
        dialog : false,
        dialogDelete : false,
        name : '',
        newData : true
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
        var uri = this.$apiurl + '/user';
            this.$http.get(uri,config).then(response =>{
                this.users=response.data.data;
                this.load = false
            }
        )
      },
      register(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = ''
        if(this.newData == true){
          uri = this.$apiurl + '/user'
          this.form.password="12345678"
        } else {
          uri = this.$apiurl + '/user/'+this.id
        }
            this.$http.post(uri,this.form,config).then(response =>{
                if(response.status===201){
                    this.dialog = false
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = 'Berhasil Input Data'; //memasukkan pesan ke snackbar
                    this.getData()
                }
                else{
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'red'; //memberi warna snackbar
                    this.text = 'Terjadi Kesalahan'; //memasukkan pesan ke snackbar
                }
            }
        )
      },
      deleteUser()
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiurl + '/user/' + this.id;
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
      showDeleteDialog(name,id){
        this.name = name
        this.id = id
        this.dialogDelete = true
      },
      showEditDialog(form){
        this.form = form
        this.id = form.id
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


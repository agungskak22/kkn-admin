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
          <h2 class="text-md-center">Data Rumah</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-text-field
                  v-model="keyword1"
                  outlined
                  label="Search"
                  height="48"
                  prepend-inner-icon="mdi-magnify"
                  color="#E4E4E4"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 class="text-right">
                <v-btn
                depressed
                dark
                color = "#E77271"
                class="btn-style"
                style="width: 200px;
    height: 48px;"
                @click="$router.push({ name : 'newHouse',params:{id: ownerId}})"
                >
                    Tambah Rumah
                </v-btn> 
            </v-flex>
          </v-layout>

          <v-data-table
              :headers="headers1"
              :items="houses"
              :search="keyword1"
              :loading="load"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item,index) in items" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.identity }}</td>
                    <td>{{ item.construction_year}}</td>
                    <td>{{ item.construction_size}}</td>
                    <td>{{ item.land_size}}</td>
                    <td class="text-center">
                      <v-btn 
                        icon
                        color="green"
                        light
                        @click="$router.push({ name : 'houseDetail',params:{id: ownerId,house: item.id}})"
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                      <v-btn 
                        icon
                        color="indigo"
                        light
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn 
                        icon
                        color="error"
                        light
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
      <v-card style="margin-top:40px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);">
        <div style="padding:20px">
          <h2 class="text-md-center">Data Lahan</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-text-field
                  v-model="keyword2"
                  outlined
                  label="Search"
                  height="48"
                  prepend-inner-icon="mdi-magnify"
                  color="#E4E4E4"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 class="text-right">
                <v-btn
                depressed
                dark
                color = "#7884CD"
                class="btn-style"
                style="width: 200px;
                height: 48px;"
                @click="dialog = true"
                >
                    Tambah Lahan
                </v-btn> 
            </v-flex>
          </v-layout>

          <v-data-table
              :headers="headers2"
              :items="landList"
              :search="keyword2"
              :loading="load"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item,index) in items" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.identity }}</td>
                    <td>{{ item.size}}</td>
                    <td>{{ item.type}}</td>
                    <td>{{ item.description}}</td>
                    <td class="text-center">
                      <v-btn 
                        icon
                        color="green"
                        light
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                      <v-btn 
                        icon
                        color="indigo"
                        light
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn 
                        icon
                        color="error"
                        light
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
      <v-card style="margin-top:40px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);">
        <div style="padding:20px">
          <h2 class="text-md-center">Data Peternakan</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-text-field
                  v-model="keyword2"
                  outlined
                  label="Search"
                  height="48"
                  prepend-inner-icon="mdi-magnify"
                  color="#E4E4E4"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 class="text-right">
                <v-btn
                depressed
                dark
                color = "#219653"
                class="btn-style"
                style="width: 200px;
                height: 48px;"
                @click="dialog = true"
                >
                    Tambah Peternakan
                </v-btn> 
            </v-flex>
          </v-layout>
          <v-data-table
              :headers="headers2"
              :items="livestockList"
              :search="keyword3"
              :loading="load"
            >
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item,index) in items" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.identity }}</td>
                    <td>{{ item.size}}</td>
                    <td>{{ item.type}}</td>
                    <td>{{ item.description}}</td>
                    <td class="text-center">
                      <v-btn 
                        icon
                        color="green"
                        light
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                      <v-btn 
                        icon
                        color="indigo"
                        light
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn 
                        icon
                        color="error"
                        light
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        headers1: [
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
              text: 'Luas Tanah',
              value: 'land_size'
            },
            {
              text: 'Aksi',
              value: null
            },
        ],
        headers2: [
            {
              text: 'No',
              value: 'no',
            },
            {
              text: 'Identitas',
              value: 'identity'
            },
            {
              text: 'Luas Tanah',
              value: 'size'
            },
            {
              text: 'Jenis Lahan',
              value: 'type'
            },
            {
              text: 'Keterangan',
              value: 'description'
            },
            {
              text: 'Aksi',
              value: null
            },
        ],
        keyword1: "",
        keyword2: "",
        keyword3: "",
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
        breadcrumbs: [
          {
            text: 'Dashboard',
            exact : true,
            to: { name: 'home' },
          },
          {
            text: 'Owner',
            disabled: true,
          },
        ],
    }
  },
  computed:{
    livestockList(){
      return this.lands.filter((row) => {
        return row.type.toLowerCase().includes("Peternakan".toLowerCase())     
      })
    },
    landList(){
      return this.lands.filter((row) => {
        return !row.type.toLowerCase().includes("Peternakan".toLowerCase())     
      })
    },
  },
  methods:{
      getData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.load = true
        var uri = this.$apiurl + '/inputs/'+this.$route.params.id;
            this.$http.get(uri,config).then(response =>{
                this.ownerId=response.data.data.id;
                this.lands=response.data.data.land.data;
                this.houses=response.data.data.house.data;
                this.load = false
            }
        )
      },
      deleteLivestock(id)
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiurl + '/livestock/' + id;
            this.$http.delete(uri,config).then(response =>{
              this.snackbar = true; //mengaktifkan snackbar
              this.color = 'green'; //memberi warna snackbar
              this.text = 'Berhasil'; //memasukkan pesan ke snackbar
              console.log(response)
              this.getData();
            }).catch(error =>{
              this.snackbar = true;
              this.text = error.response.data.message;
              this.color = 'red';
              this.load = false;
          })
      },
      deleteLand(id)
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiurl + '/land/' + id;
            this.$http.delete(uri,config).then(response =>{
              this.snackbar = true; //mengaktifkan snackbar
              this.color = 'green'; //memberi warna snackbar
              this.text = 'Berhasil'; //memasukkan pesan ke snackbar
              console.log(response)
              this.getData();
            }).catch(error =>{
              this.snackbar = true;
              this.text = error.response.data.message;
              this.color = 'red';
              this.load = false;
          })
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
</style>
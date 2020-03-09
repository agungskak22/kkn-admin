<template>
  <div>
      <div style="padding:40px">
        <v-row>
            <v-col col="4">
              <v-card
              class="mx-auto elevation-0"
              color="#7884CD"
              dark
              style="box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border-radius: 4px;"
              >
              <div class="card-body">
              <v-card-text style="padding:16px">
                <div>
                  <div class="count-title">
                    240
                  </div>
                  <div class="count-info">
                    Lahan
                  </div>
                </div>
                <div class="text-information">
                  Total Lahan Saat Ini
                </div>
              </v-card-text>
              </div>
              </v-card>
            </v-col>
            <v-col col="4">
              <v-card
              class="mx-auto elevation-0"
              color="#BB64CA"
              dark
              style="box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border-radius: 4px;"
              >
              <div class="card-body">
              <v-card-text style="padding:16px">
                <div>
                  <div class="count-title">
                    251
                  </div>
                  <div class="count-info">
                    Rumah
                  </div>
                </div>
                <div class="text-information">
                  Total Bangunan Saat Ini
                </div>
              </v-card-text>
              </div>
              </v-card>
            </v-col>
            <v-col col="4">
              <v-card
              class="mx-auto elevation-0"
              color="#52575C"
              dark
              style="box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border-radius: 4px;"
              >
              <div class="card-body">
              <v-card-text style="padding:16px">
                <div>
                  <div class="count-title">
                    700
                  </div>
                  <div class="count-info">
                    Ternak
                  </div>
                </div>
                <div class="text-information">
                  Total Ternak Saat Ini
                </div>
              </v-card-text>
              </div>
              </v-card>
            </v-col>
        </v-row>
        <v-card style="margin-top:28px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);">
          <div style="padding:20px">
            <h2 class="text-md-center">Data Pemilik</h2>
            <v-layout row wrap style="margin:10px">
              <v-flex xs6>
                <v-text-field
                    v-model="keyword"
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
                  color = "#007EFF"
                  class="btn-style"
                  style="width: 200px;
      height: 48px;"
                  @click="dialog = true"
                  >
                      Tambah Baru
                  </v-btn> 
              </v-flex>
            </v-layout>

            <v-data-table
                :headers="headers"
                :items="owners"
                :search="keyword"
                :loading="load"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="(item,index) in items" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.created_at.slice(0,22)}}</td>
                      <td>22</td>
                      <td>22</td>
                      <td>22</td>
                      <td>
                        <v-btn 
                          depressed
                          color="#FFB840"
                          @click="$router.push({ name : 'ownerDetail',params:{id: item.id}})"
                          dark
                        >
                          Detail
                        </v-btn>
                      </td>
                      <td class="text-center">
                        <v-btn 
                          icon
                          color="indigo"
                          light
                          @click="editHandler(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn 
                          icon
                          color="error"
                          light
                          @click="deleteData(item.id)"
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
import store from '../../store'
export default {
  data () {
    return {
       owners:[],
       headers: [
            {
              text: 'No',
              value: 'no',
            },
            {
              text: 'Name',
              value: 'name'
            },
            {
              text: 'Created_At',
              value: 'created_At'
            },
            {
              text: 'Jumlah Ternak',
              value: ''
            },
            {
              text: 'Jumlah Rumah',
              value: ''
            },
            {
              text: 'Jumlah Bangunan',
              value: ''
            },
            {
              text: 'Detail',
              value: null
            },
            {
              text: 'Aksi',
              value: null
            },
        ],
        keyword: '',
        load: false,
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
        var uri = this.$apiurl + '/my/inputs'
            this.$http.get(uri,config).then(response =>{
                this.owners=response.data.data;
                this.load = false
            }
        )
      },
      countData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/my/datas'
            this.$http.get(uri,config).then(response =>{
                this.total_datas=response.data.total_datas;
                this.total_lands=response.data.total_lands;
                this.total_livestocks=response.data.total_livestocks;
            }
        )
      },
      logout(){
          localStorage.removeItem('token')
          store.commit('logoutUser')
          this.$router.push({ name: 'login' })
      }
  },
  mounted(){
    this.getData();
  },
}
</script>
<style lang="scss">
.card-body{
    .count-title{
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 42px;
      letter-spacing: 0.1px;
      color: #FFFFFF;
      display: inline;
    }
    .count-info{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 42px;
      display: inline;
      /* identical to box height, or 262% */

      letter-spacing: 0.1px;

      /* color/whit */

      color: #FFFFFF;
    }
    .text-information{
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 18px;
      /* identical to box height, or 129% */

      letter-spacing: 0.2px;

      /* color/whit */

      color: #FFFFFF;
    }
}
.btn-style{
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  border-radius: 5px;
}
</style>
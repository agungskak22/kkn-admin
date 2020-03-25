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
        <v-card style="box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
            <div class="card-header-parent">
                <h2 style="margin-left:16px">Data Rumah</h2>
            </div>
            <v-divider></v-divider>
            <div class="card-body-parent">
                <v-layout row wrap>
                <v-flex xs12 sm4>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Peta Rumah</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <gmap-map :center="center" :options="{zoomControl: true, draggable:false,mapTypeControl: false,scaleControl: false,streetViewControl: false,rotateControl: false,fullscreenControl: true,disableDefaultUi: true
    }" :zoom="18" style="width: 100%;height:270px;margin-bottom:16px">
                                <gmap-polygon :options="options" :paths="paths" :draggable="false" :editable="false" >
                                </gmap-polygon>
                            </gmap-map>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Gambar Rumah</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <img v-if="images.length!=0" class="preview-image" :src="$imageUrl + '/images/'+images[0].filename" alt="">
                            <img v-else class="preview-image" :src="require('@/assets/photo-add.svg')" >
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Daftar Ruangan</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <div v-if="rooms.length!=0">
                                <div v-for="(room) in rooms" :key="room.id">
                                  <v-list-item>
                                      <v-list-item-icon>
                                          <v-icon large color="indigo">mdi-window-shutter-open</v-icon>
                                      </v-list-item-icon>

                                      <v-list-item-content>
                                          <v-list-item-title>{{ room.category }}</v-list-item-title>
                                          <v-list-item-subtitle>{{ room.size }}</v-list-item-subtitle>
                                      </v-list-item-content>
                                  </v-list-item>  
                                </div>
                            </div>
                            <div v-else>
                                empty
                            </div>
                        </div>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm8>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Data Rumah</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-text-field
                                v-model="form.identity"
                                height=20
                                outlined
                                label="Identitas Rumah"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.address"
                                height=20
                                outlined
                                label="Alamat"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-select
                                v-model="form.construction_year"
                                :items="years"
                                label="Tahun Pembangunan"
                                outlined
                                light
                            ></v-select>
                            <v-select
                                v-model="form.side_facing"
                                :items="compass"
                                label="Arah Hadap Bangunan"
                                outlined
                                light
                            ></v-select>
                            <v-text-field
                                v-model="form.land_size"
                                height=20
                                outlined
                                label="Luas Tanah"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.construction_size"
                                height=20
                                outlined
                                label="Luas Bangunan"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.floor_size"
                                height=20
                                outlined
                                label="Luas Lantai"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.floors_number"
                                height=20
                                outlined
                                label="Jumlah Lantai"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.number_of_adult_male"
                                height=20
                                outlined
                                label="Jumlah Laki-laki Dewasa"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.number_of_adult_female"
                                height=20
                                outlined
                                label="Jumlah Perempuan Dewasa"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.number_of_boys"
                                height=20
                                outlined
                                label="Jumlah Anak Laki-laki"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.number_of_girls"
                                height=20
                                outlined
                                label="Jumlah Anak Perempuan"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-text-field
                                v-model="form.number_of_married_couples"
                                height=20
                                outlined
                                label="Jumlah Pasutri"
                                color="indigo"
                                light
                            ></v-text-field>
                            <v-select
                                v-model="form.designer"
                                :items="designers"
                                label="Siapa yang merancang rumah anda?"
                                outlined
                                light
                            ></v-select>
                            <v-select
                                v-model="form.constructor"
                                :items="designers"
                                label="Siapa yang membangun rumah anda?"
                                outlined
                                light
                            ></v-select>
                            <v-select
                                v-model="form.septic_tank"
                                :items="choices"
                                label="Apakah rumah Anda telah dilengkapi Septic Tank?"
                                outlined
                                light
                            ></v-select>
                            <v-select
                                v-model="form.kloset_leher_angsa"
                                :items="choices"
                                label="Apakah kloset Anda merupakan kloset pabrikasi leher angsa?"
                                outlined
                                light
                            ></v-select>
                            <v-select
                                v-model="form.grease_trap"
                                :items="choices"
                                label="Apakah bak cuci piring Anda dilengkapi Bak Penangkap Lemak?"
                                outlined
                                light
                            ></v-select>
                            <v-select
                                v-model="form.rain_water_managment"
                                :items="choices"
                                label="Apakah rumah anda dilengkapi Pengelolaan Air Hujan?"
                                outlined
                                light
                            ></v-select>
                        </div>
                    </v-card>
                </v-flex>
                </v-layout>
            </div>
        </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        form : {
           identity : null,
           address : null,
           construction_year : null,
           land_size : null,
           construction_size : null,
           floor_size : null,
           floors_number : null,
           side_facing : null,
           number_of_adult_male : null,
           number_of_adult_female : null,
           number_of_boys : null,
           number_of_girls : null,
           number_of_married_couples : null,
           designer : null,
           constructor : null,
           septic_tank : "Ya",
           grease_trap : "Ya",
           rain_water_managment : "Ya",
           kloset_leher_angsa : "Ya",
           fillColor : null,
           strokeColor : null,
           owner_id : null,
        },
        compass: ["Utara","Barat Laut","Barat","Barat Daya","Selatan","Tenggara","Timur","Timur Laut"], 
        e1:0,
        lands:[],
        images:[],
        showColor1:false,
        showColor2:false,
        dialog: false,
        center: { lat:-7.779047, lng: 110.416957 },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
        allPaths: [],
        rooms: [],
        mode: 'hexa',
        marker: false,
        designers : ["Sendiri","Tukang","Arsitek/Teknik Sipil/Kontraktor","Lainnya"],
        choices : ["Ya","Tidak"],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        edited: false,
        text: '', 
        title: 'MASUKAN DATA RUMAH',
        typeInput: 'new',
        mapMode: false,
        breadcrumbs: [
          {
            text: 'Dashboard',
            exact : true,
            to: { name: 'home' },
          },
          {
            text: 'Owner',
            exact : true,
            to: { name: 'ownerDetail' },
          },
          {
            text: 'House',
            disabled: true,
          },
        ],
    }
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1900}, (value, index) => 1901 + index)
    }
  },
  methods:{
    store(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
      var payload 
      if(this.edited==true)
      {
        payload = {
          identity: this.form.identity,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          address : this.form.identity,
          construction_year : this.form.construction_year,
          land_size : this.form.land_size,
          construction_size : this.form.construction_size,
          floor_size : this.form.floor_size,
          floors_number : this.form.floors_number,
          side_facing : this.form.side_facing,
          number_of_adult_male : this.form.number_of_adult_male,
          number_of_adult_female : this.form.number_of_adult_female,
          number_of_boys : this.form.number_of_boys,
          number_of_girls : this.form.number_of_girls,
          number_of_married_couples : this.form.number_of_married_couples,
          designer : this.form.designer,
          constructor : this.form.constructor,
          septic_tank : this.form.septic_tank,
          grease_trap : this.form.grease_trap,
          rain_water_managment : this.form.rain_water_managment,
          kloset_leher_angsa : this.form.kloset_leher_angsa,
          polygons: this.paths[0]
        }
      }
      else if(this.edited==false)
      {
        payload = {
          identity: this.form.identity,
          type: this.form.type,
          size: this.form.size,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          polygons: this.paths
        }
      }
      
      var uri = ''
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        uri = this.$apiurl + '/house'
      } else {
        uri = this.$apiurl + '/house/'+this.$route.params.land;
      }
      this.$http.post(uri,payload,config).then(response =>{
        console.log(response)
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.message;
        this.color = 'red';
        this.load = false;
      })
    },
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiurl + '/house/'+this.$route.params.house,config).then(response =>{
            this.form = response.data.data
            this.paths = response.data.data.polygon.data
            this.images = response.data.data.image.data
            this.rooms = response.data.data.room.data
            this.options.fillColor = response.data.data.fillColor
            this.options.strokeColor = response.data.data.strokeColor
            if(response.data.data.polygon.data.length>0)
            {
              this.center = response.data.data.polygon.data[0]
            }
            if(this.paths.length!=0)
            {
              this.marker = false
            }
        })
    },
    async getAllData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiurl + '/land',config).then(response =>{
            this.lands = response.data.data
        })
    },
    updateEdited(mvcArray) {
      for( var i = 0; i < this.lands.length; i++){ 
        if ( this.lands[i].id == this.$route.params.land) {
          this.lands.splice(i, 1); 
        }
      }
      let paths = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({lat: point.lat(), lng: point.lng()});
        }
        paths.push(path);
      }
      this.edited = true
      // this.edited = paths;
      this.paths = paths;
    },
    updateMarker(mvcArray) {
      let paths = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({lat: point.lat(), lng: point.lng()});
        }
        paths.push(path);
      }
      this.center = paths;
    },
    markerPlace(e){
			this.center.lat = e.latLng.lat()
			this.center.lng = e.latLng.lng()
    },
    clearMarker()
    {
      for( var i = 0; i < this.lands.length; i++){ 
        if ( this.lands[i].id == this.$route.params.land) {
          this.lands.splice(i, 1); 
        }
      }
      this.marker=true
      this.paths=[]
    },
    setMarker()
    {
      //Patokan
      // {lat:-7.780047, lng: 110.415957 },{lat:-7.780047, lng: 110.417957 },{lat:-7.778047, lng: 110.417957 },{lat:-7.778047, lng: 110.415957 } 
      this.marker=false
      this.paths=[]
      this.paths.push({lat : this.center.lat - 0.001, lng : this.center.lng - 0.001})
      this.paths.push({lat : this.center.lat - 0.001, lng : this.center.lng + 0.001})
      this.paths.push({lat : this.center.lat + 0.001, lng : this.center.lng + 0.001})
      this.paths.push({lat : this.center.lat + 0.001, lng : this.center.lng - 0.001})
    },
    setPlace(place) {
			this.center.lat =  place.geometry.location.lat()
			this.center.lng =  place.geometry.location.lng()
		},
  },
  mounted(){
      this.getAllData()
      if (this.$route.params.house){
          this.title = "UBAH DATA RUMAH"
        //   this.links.push({text: this.$route.params.slug, disabled: false, to:{name: 'DetailEvent', params:{slug: this.$route.params.slug}}})
          this.typeInput = 'edit'
        //   this.changeImg = 3
        //   this.links.push({text: 'Update', disabled: true})
          this.getPostData()
      }
      else{
        this.marker=true
      }
  },
}
</script>

<style lang="scss">
.card-body-parent{
    padding: 28px;
}
.card-header-parent{
    height: 80px;
    display: table-cell;
    vertical-align: middle;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
    color: #52575C;
    padding: 8px;
}
.card-header{
    height: 76px;
    display: table-cell;
    vertical-align: middle;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #333333;
}
.card-body{
    padding: 20px;
}
.preview-image{
    height: 280px;
    width: 100%;
}
.breadcrumbs-box{
  background: #FFFFFF;
  height: 64px;
  width: 100%;
  padding: 8px;
}
</style>
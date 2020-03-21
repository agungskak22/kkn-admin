<template>
  <div>
    <div style="padding:40px">  
        <v-card style="box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
            <v-card style="border: 0.5px solid #E0E0E0;box-sizing: border-box;border-radius: 4px;margin:16px">
              <v-layout row wrap style="margin:10px">
              <v-flex xs12 md5>
               <v-text-field
                    v-model="keyword"
                    outlined
                    label="Search"
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    color="#E4E4E4"
                    style="padding:4px"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4 class="text-right">
                <v-select
                  v-model="filterDisaster"
                  :items="items"
                  hide-details
                  label="Status kebencanaan"
                  style="padding:4px"
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 md3 class="pa-1">
                <v-btn
                    depressed
                    style="float:right"
                    dark
                    color = "#007EFF"
                    height="56"
                    @click="dialog = true"
                    >
                    Generate Logistic
                </v-btn> 
          </v-flex>
            </v-layout>
            </v-card>
            <div class="card-body-parent" style="margin:16px">
                <gmap-map :center="center" :zoom="16" style="width: 100%;height:calc(75vh)">
                    <gmap-info-window  :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                        <div style="padding:8px">
                            <h4>{{infoContent}}</h4>
                            <img style="width:120px;height:120px;margin-top:8px" :src="$imageUrl + '/images/'+thumbnail">
                        </div>  
                    </gmap-info-window>
                    <gmap-polygon v-for="(land) in landList" :key="land.id" :options="{ fillColor:land.fillColor,strokeColor:land.strokeColor,strokeWeight: 1 } " @click="toggleInfoWindow(land,land.id)" :clickable="true" :paths="land.polygon.data" :draggable="false" :editable="false">
                    </gmap-polygon>
                    <gmap-polygon v-for="(house) in houseList" :key="house.id" :options="{ fillColor:house.fillColor,strokeColor:house.strokeColor,strokeWeight: 1 } " @click="toggleInfoWindow(house,house.id)" :clickable="true" :paths="house.polygon.data" :draggable="false" :editable="false">
                    </gmap-polygon>
                    <gmap-polygon v-for="(data) in publicList" :key="data.id" :options="{ fillColor:data.fillColor,strokeColor:data.strokeColor,strokeWeight: 1 } " @click="toggleInfoWindow(data,data.id)" :clickable="true" :paths="data.polygon.data" :draggable="false" :editable="false">
                    </gmap-polygon>
                </gmap-map>
            </div>
        </v-card>
    </div>
    <v-dialog v-model="dialog" scrollable max-width="350px">
      <v-card>
        <v-card-title>Pilih Status Kebencanaan</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
            <v-container fluid>
        <v-row class="mt-0">
          <v-col cols="12" sm="12" md="12">
            <v-checkbox
              v-model="selected"
              label="Rendah"
              color="primary"
              value="Rendah"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="Sedang"
              color="primary"
              value="sedang"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="Tinggi"
              color="primary"
              value="Tinggi"
              hide-details
            ></v-checkbox>
          <v-divider class="mt-4"></v-divider>
            <v-checkbox
              v-model="selected"
              label="Pilih Semua"
              color="success"
              value="semua"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
        </v-card-text>
        <v-divider class="mb-1"></v-divider>
        <v-card-actions class="mb-1">
          <v-btn block elevation="0" color="blue darken-1" dark  @click="$router.push({ name : 'logistic'})">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
        selected:[],
        dialog: false,
        owner:{},
        keyword:"",
        ownerId: null,
        publics:[],
        lands:[],
        houses:[],
        snackbar: false, 
        color: null,
        text: '',
        center: { lat:-7.779047, lng: 110.416957 },
        inset: false, 
        infoContent: '',
        infoWindowPos: {
            lat: 0,
            lng: 0,
        },
        infoWinOpen: false,
        currentMidx: null,
        thumbnail: null,
        currentLocation : { lat : 0, lng : 0},
        items : ["rendah","sedang","tinggi"],
        filterDisaster : ""
        //optional: offset infowindow so it visually sits nicely on top of our marker
    }
  },
   computed:{
      houseList(){
        return this.houses.filter((row, index) => {
            console.log(index)
            if(this.filterDisaster != '') return row.disaster_status.toLowerCase().includes(this.filterDisaster); //menampilkan data data yang memiliki kemiripan nama dengan variable search yang diinputkan        
            return true;
        });     
      },
      landList(){
        return this.lands.filter((row, index) => {
            console.log(index)
            if(this.filterDisaster != '') return row.disaster_status.toLowerCase().includes(this.filterDisaster); //menampilkan data data yang memiliki kemiripan nama dengan variable search yang diinputkan        
            return true;
        });     
      },
      publicList(){
        return this.publics.filter((row, index) => {
            console.log(index)
            if(this.filterDisaster != '') return row.disaster_status.toLowerCase().includes(this.filterDisaster); //menampilkan data data yang memiliki kemiripan nama dengan variable search yang diinputkan        
            return true;
        });     
      }
  },
  methods:{
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
    async getHouseData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiurl + '/house',config).then(response =>{
            this.houses = response.data.data
        })
    },
    async getPublicData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiurl + '/publicbuilding',config).then(response =>{
            this.publics = response.data.data
        })
    },
    toggleInfoWindow(marker, idx) {
        this.infoWindowPos = this.get_polygon_centroid(marker.polygon.data);
        if(marker.image)
        {
            this.thumbnail = marker.image.data[0].filename
        }  
        else
        {
            this.thumbnail = "notfound.png"
        }
        this.infoContent = marker.identity;
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
            this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
            this.infoWinOpen = true;
            this.currentMidx = idx;
        }
    },
    get_polygon_centroid(pts) {
        var first = pts[0], last = pts[pts.length-1];
        if (first.lat != last.lat || first.lng != last.lng) pts.push(first);
        var twicearea=0,
        lat=0, lng=0,
        nPts = pts.length,
        p1, p2, f;
        for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
            p1 = pts[i]; p2 = pts[j];
            f = (p1.lng - first.lng) * (p2.lat - first.lat) - (p2.lng - first.lng) * (p1.lat - first.lat);
            twicearea += f;
            lat += (p1.lat + p2.lat - 2 * first.lat) * f;
            lng += (p1.lng + p2.lng - 2 * first.lng) * f;
        }
        f = twicearea * 3;
        return { lat:lat/f + first.lat, lng:lng/f + first.lng };
    },
    setPlace(place) {
        this.center.lat =  place.geometry.location.lat()
        this.center.lng =  place.geometry.location.lng()
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  mounted(){
      this.geolocation()
      this.getAllData()
      this.getHouseData()
      this.getPublicData()
  },
}
</script>

<style lang="scss">
</style>

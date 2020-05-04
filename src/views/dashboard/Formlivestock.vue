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
          <div style="padding: 28px;">
                  <div>
                    <gmap-map :center="center" :zoom="18" :options="mapMode==true? optionmaps : optionmaps2 " :style="mapMode==false? 'height:428px' : 'height:528px'" style="width: 100%;margin-bottom:16px" @click="markerPlace($event)">
                        <gmap-polygon :options="options" :paths="paths" :draggable="true" :editable="true" @paths_changed="updateEdited($event)">
                        </gmap-polygon>
                        <gmap-polygon v-for="(land) in lands" :key="land.id" :options="{ fillColor:land.fillColor,strokeColor:land.strokeColor,strokeWeight: 1 } " :paths="land.polygon.data" :draggable="false" :editable="false">
                        </gmap-polygon>
                        <gmap-marker v-if="marker==true"
                            :position="center" :draggable="true" @dragend="markerPlace($event)">
                        </gmap-marker>
                    </gmap-map>
                  </div>
                  <v-card style="margin-top:30px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                    <div style="padding: 28px;">
                    <v-card-actions>
                    <v-btn dark height="40" width="120" color="#E77271" @click="clearMarker()" class="elevation-0">
                      Clear
                    </v-btn>
                    <v-btn dark color="primary" height="40" width="130" @click="setMarker()" class="elevation-0">
                      Set Lokasi
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        tile small color="indigo" class="white--text elevation-0" @click="dialog=true" style="border-radius:4px;height:40px;color:#FFFFFF;margin-bottom:16px"
                      >
                        <v-icon color="white">mdi-format-color-fill</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                v-model="form.identity"
                                height=20
                                outlined
                                label="Identitas Lahan"
                                prepend-inner-icon="mdi-pier"
                                color="indigo"
                                light
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                v-model="form.disaster_status"
                                :items="disasterStatus"
                                label="Status Kebencanaan"
                                outlined
                                light
                            ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                v-model="form.size"
                                height=20
                                outlined
                                label="Luas Tanah (meter persegi)"
                                prepend-inner-icon="mdi-image-size-select-small"
                                color="indigo"
                                light
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                v-model="form.type"
                                :items="types"
                                label="Jenis Lahan"
                                outlined
                                light
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                            <v-textarea
                            light
                            v-model="form.description"
                            outlined
                            label="Keterangan"
                            ></v-textarea>
                            </v-col>
                            <v-col cols="12" class="item-top">
                              <span class="item-title" style="color:black">Data Ternak</span>
                              <v-btn class="item-add" style="float:right" @click="dialog2=true,typeInput2='new'" text icon >
                              <v-icon color="orange" >mdi-plus-circle</v-icon>
                              </v-btn>
                          </v-col>
                          <v-col cols="12" v-if="livestocks.length<1" style="text-align:center" class="item-list isEmpty">
                              <span>Tidak Terdapat Data</span>
                          </v-col>
                          <v-col cols="12" v-else class="item-list">
                                <div v-for="(livestock) in livestocks" :key="livestock.id">
                                <v-list-item light >
                                    <v-list-item-icon>
                                        <v-icon large :color="livestock.gender=='Betina' ? 'pink' : 'indigo'">mdi-cow</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title>{{ livestock.species + " " + livestock.gender }}</v-list-item-title>
                                        <v-list-item-subtitle>{{"Jumlah : " + livestock.amount }}</v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-menu bottom left>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="item-add" text icon  v-on="on">
                                            <v-icon color="#B0BEC5">mdi-dots-vertical</v-icon>
                                            </v-btn>  
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                            <v-list-item-title @click="editLivestock(livestock)" >Edit</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title  @click="deleteLivestock(livestock)" >Delete</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                        </v-menu>
                                    </v-list-item-action>
                                </v-list-item>   
                                </div>
                          </v-col>
                            
                            <v-col cols="12">
                                <v-spacer></v-spacer>
                                <div style="float:right">
                                <v-btn color="primary" dark @click="store()" class="elevation-0">
                                    Finish
                                </v-btn>
                                </div>
                            </v-col>
                    </v-row>
                </v-card-actions>
                </div>
            </v-card>
          </div>
        </v-card>
    </div>
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
    <v-dialog v-model="dialog" persistent max-width="390">
      <v-card>
        <v-card-title class="headline" style="margin-bottom:8px">Setting Polygon Marker</v-card-title>
        <v-card-text>
            <v-text-field
                v-model="options.strokeColor"
                height=20
                outlined
                label="Warna Garis"
                prepend-inner-icon="mdi-format-color-fill"
                color="indigo"
                light
                @click="showColor1=true"
            ></v-text-field>
            <div v-if="showColor1">
              <v-color-picker
              v-model="options.strokeColor"
              :hide-canvas="false"
              :hide-inputs="false"
              :hide-mode-switch="true"
              :mode.sync="mode"
              class="mx-auto elevation-0"
              ></v-color-picker>
              <v-btn tile dark block small color="red" style="border-radius: 2px;width: 120px;height: 39px;margin-bottom:12px" @click="showColor1=false" class="elevation-0">
                Close
              </v-btn>
            </div>
            <v-text-field
                v-model="options.fillColor"
                height=20
                outlined
                label="Warna Isi"
                prepend-inner-icon="mdi-format-color-fill"
                color="indigo"
                light
                @click="showColor2=true"
            ></v-text-field>
            <div v-if="showColor2">
              <v-color-picker
              v-model="options.fillColor"
              :hide-canvas="false"
              :hide-inputs="false"
              :hide-mode-switch="true"
              :mode.sync="mode"
              class="mx-auto elevation-0"
              ></v-color-picker>
              <v-btn tile dark block small color="red" style="border-radius: 2px;width: 120px;height: 39px;margin-bottom:12px" @click="showColor2=false" class="elevation-0">
                Close
              </v-btn>
            </div>
            <div style="display: flex; justify-content: flex-end">
              <v-btn dark tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;" @click="dialog=false" class="elevation-0">
                Close
              </v-btn>
            </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="390">
      <v-card>
        <v-card-title class="headline" style="margin-bottom:8px">Masukan Data Ternak</v-card-title>
        <v-card-text>
            <v-form v-model="isFormValid">
              <v-select
              v-model="form2.species"
              :rules="[rules.required]"
              :items="species"
              label="Jenis Ternak"
              outlined
              light
              ></v-select>
              <v-select
              v-model="form2.gender"
              :rules="[rules.required]"
              :items="gender"
              label="Jenis Kelamin"
              outlined
              light
              ></v-select>
              <v-text-field
                  v-model="form2.amount"
                  height=20
                  outlined
                  :rules="[rules.required,rules.numberOnly]"
                  label="Jumlah"
                  prepend-inner-icon="mdi-database-plus"
                  color="indigo"
                  light
              ></v-text-field>
            </v-form>
            <div style="display: flex; justify-content: flex-end">
              <v-btn dark tile small color="#FFFFFF"  style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;" @click="dialog2=false" class="elevation-0">
                Close
              </v-btn>
              <v-btn :disabled="!isFormValid" tile light small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;color:white" @click="submitLivestock()" class="elevation-0">
                  Finish
              </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
            text: 'Owner',
            exact : true,
            to: { name: 'ownerDetail' },
          },
          {
            text: 'Livestock',
            disabled: false,
          },
        ],
        form : {
           identity : null,
           size : null,
           type : null,
           fillColor : null,
           strokeColor : null,
           owner_id : null,
           description : null,
           disaster_status : null,
        }, 
        form2 : {
           amount : null,
           species : null,
           gender : null,
        },
        optionmaps : {
          scrollwheel: false, mapTypeControl: false, draggable: false, disableDoubleClickZoom: true,zoomControl: false                      
        },
        optionmaps2 : {
          scrollwheel: true, mapTypeControl: true, draggable: true, disableDoubleClickZoom: false,zoomControl: true, clickableIcons: false                     
        },
        isFormValid: false, 
        idHouse: null,
        idRoom: null,
        categories : ["Ruang Tamu","Kamar Tidur","Kamar Mandi","Dapur","Gudang","Ruang Keluarga","Ruang Makan","Garasi"],
        compass: ["Utara","Barat Laut","Barat","Barat Daya","Selatan","Tenggara","Timur","Timur Laut"], 
        religions: ["Kristen","Katholik","Islam","Hindu","Budha","Konghucu"],
        e1:0,
        lands:[],
        windows:[],
        persons:[],
        buildings:[],
        livestocks:[],
        savedImage:[],
        addWindow:false,
        showColor1:false,
        showColor2:false,
        dialog: false,
        dialog2 :false,
        dialogRooms: false,
        center: { lat:-7.779047, lng: 110.416957 },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
        allPaths: [],
        mode: 'hexa',
        marker: true,
        windowTypes:["Jendela Hidup","Jendela Mati","Ventilasi"],
        designers : ["Sendiri","Tukang","Arsitek/Teknik Sipil/Kontraktor","Lainnya"],
        designers2 : ["Sendiri","Tukang","Arsitek/Teknik Sipil/Kontraktor","Lainnya"],
        disasterStatus : ["rendah","sedang","tinggi"],
        choices : ["Ya","Tidak"],
        waters : ["Sumur","PDAM"],
        types : ["Peternakan"],
        species : ["Ayam","Sapi","Bebek",'Kambing','Domba',"Lele","Lainnya"],
        gender : ["Jantan","Betina"],
        functions : ["Kantor Polisi","Balai Desa","Balai Dusun","Balai RT","Balai RW","Puskesmas","Lainnya"],
        genders : ["Laki-laki","Perempuan"],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        edited: false,
        text: '', 
        title: 'MASUKAN DATA RUMAH',
        typeInput: 'new',
        typeInput2: 'new',
        typeInput3: 'new',
        item:{},
        mapMode: false,
        data: new FormData,
        rooms:[],
        img: null,
        images : [],
        thumbnails : [],
        thumbnail : {
          display : null,
          base64 : null
        },
        rules: {
          required: value => !!value || 'Data is required',
          numberOnly: value => !isNaN(value) || 'Number Only',
          textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Text Only'
        },
    }
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1900}, (value, index) => 1901 + index)
    },
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
          type: this.form.type,
          size: this.form.size,
          description: this.form.description,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          polygons: this.paths[0],
          livestocks: this.livestocks,
          disaster_status : this.form.disaster_status
        }
      }
      else if(this.edited==false)
      {
        payload = {
          identity: this.form.identity,
          type: this.form.type,
          size: this.form.size,
          description: this.form.description,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          polygons: this.paths,
          livestocks: this.livestocks,
          disaster_status : this.form.disaster_status
        }
      }
      var uri = ""
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        uri = this.$apiurl + '/land'
      } else {
        uri = this.$apiurl + '/land/'+this.$route.params.land;
      }
      this.$http.post(uri,payload,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        console.log(response)
        this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.errors;
        this.color = 'red';
        this.load = false;
      })
    },
    submitLivestock()
    {
        if(this.typeInput2=='new')
        {
          var i = 0
          var object = this.form2
          for(var data in this.livestocks)
          {
              console.log(data)
              if(this.livestocks[i].species==object.species && this.livestocks[i].gender==object.gender )
              {
                   this.snackbar = true;
                   this.text = "Data Sudah Diinputkan";
                   this.color = 'red';
                   return
              }
              i++;
          }
          this.livestocks.push(JSON.parse(JSON.stringify(this.form2)))
        }
        else{
          var j = 0
          var object2 = this.form2
          for(var data2 in this.livestocks)
          {
              console.log(data2)
              if(this.livestocks[j].species==object2.species && this.livestocks[j].gender==object2.gender )
              {
                   this.snackbar = true;
                   this.text = "Data Sudah Diinputkan";
                   this.color = 'red';
                   return
              }
              j++;
          }
          var index = this.livestocks.indexOf(this.item);
          this.livestocks[index].amount=this.form2.amount
          this.livestocks[index].species=this.form2.species
          this.livestocks[index].gender=this.form2.gender
        }

        this.dialog2=false
        this.resetFormLiveStock()
        // this.resetForm3()
    },
    editLivestock(item)
    {
      
        this.form2=item
        this.item=item
        this.typeInput2="edit"
        this.dialog2=true
    },

    deleteLivestock(item)
    {
        var index = this.livestocks.indexOf(item);
        this.livestocks.splice(index, 1);
    },
    resetFormLiveStock()
    {
      this.form2 = {
           amount : null,
           species : null,
           gender : null,
        }
    },
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiurl + '/land/'+this.$route.params.land,config).then(response =>{
            this.form = response.data.data
            this.livestocks = response.data.data.livestock.data
            this.paths = response.data.data.polygon.data
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
    async getData(){
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
        if ( this.lands[i].id == this.$route.params.public) {
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
      this.paths.push({lat : this.center.lat - 0.0001, lng : this.center.lng - 0.0001})
      this.paths.push({lat : this.center.lat - 0.0001, lng : this.center.lng + 0.0001})
      this.paths.push({lat : this.center.lat + 0.0001, lng : this.center.lng + 0.0001})
      this.paths.push({lat : this.center.lat + 0.0001, lng : this.center.lng - 0.0001})
    },
    setPlace(place) {
			this.center.lat =  place.geometry.location.lat()
			this.center.lng =  place.geometry.location.lng()
		},
  },
  mounted(){
      this.form.type="Peternakan"
      this.getData()
      if (this.$route.params.land){
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
.title-detail{
  font-family: Roboto; //harusnya poppins
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 47px;
  color:black;
}
.breadcrumbs-box{
  background: #FFFFFF;
  height: 64px;
  width: 100%;
  padding: 8px;
}
.v-icon {
    color: #DADADA !important;
}
.form-header{
  background-color:#DADADA;
  height: 45px;
  .form-header-title{
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: justify;
    margin: 0px auto;
    display: flex;
    justify-content: center;

    font-family: Roboto; //harusnya poppins
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 47px;

    /* or 392% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #1D1D1D;
  }
}
.title-photo{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 12px;
  /* identical to box height */

  color: #979797;
}
.box-photo{
  position: relative;
  background: #FFFFFF;
  border: 1px solid rgba(165, 165, 165, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-photo{
  width: 100%;
  height: 110px;
  background: #F8F8F8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.uploadButton{
  position:absolute; 
  opacity : 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}
.iconCancel{
  position: absolute !important;
  right: 0;
  top: 0;
  float: right;
  z-index: 1;
}
</style>


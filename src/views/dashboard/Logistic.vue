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
                <h2 style="margin-left:16px">Logistic Terdampak</h2>
            </div>
            <v-divider></v-divider>
            <div class="card-body-parent">
                <v-layout row wrap>
                <v-flex xs12 sm4>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Daerah Terdampak</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <gmap-map :center="center" :options="{zoomControl: true, draggable:false,mapTypeControl: false,scaleControl: false,streetViewControl: false,rotateControl: false,fullscreenControl: true,disableDefaultUi: true }" :zoom="18" style="width: 100%;height:270px;margin-bottom:16px">
                                <gmap-polygon :options="options" :paths="paths" :draggable="false" :editable="false" >
                                </gmap-polygon>
                            </gmap-map>
                        </div>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm8>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Tempat Penampungan / Hunian Sementara</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="detailPengadaan"
                            :items="penampungan"
                            :items-per-page="5"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Bantuan Pangan</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="detailPengadaan"
                            :items="pangan"
                            :items-per-page="5"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Bantuan Pangan</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="detailPengadaan"
                            :items="pangan"
                            :items-per-page="5"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Bantuan Pangan</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="detailPengadaan"
                            :items="pangan"
                            :items-per-page="5"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Bantuan Pangan</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="detailPengadaan"
                            :items="pangan"
                            :items-per-page="5"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <v-flex>
                            <v-btn color="primary" block class="elevation-0">
                                Export To Excel
                            </v-btn>
                        </v-flex>
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
        detailPengadaan: [
          {
            text: 'Jenis Barang',
            align: 'start',
            sortable: false,
            value: 'jenis',
          },
          { text: 'Jumlah', value: 'jumlah' },
          { text: 'satuan', value: 'satuan' },
          { text: 'Keterangan', value: 'keterangan' }
        ],
        penampungan: [
          {
            jenis: 'Tenda',
            jumlah: 300,
            satuan: 'tenda',
            keterangan: 'Tenda BNBP Luas 72 Sqm'
          },
          {
            jenis: 'Barack',
            jumlah: 66000,
            satuan: 'Sqm',
            keterangan: '-'
          },
          {
            jenis: 'Gedung Fasilitas',
            jumlah: 66000,
            satuan: 'Sqm',
            keterangan: '-'
          },
        ],
        pangan: [
          {
            jenis: 'Beras',
            jumlah: 8800.000,
            satuan: 'Gram/Hari',
            keterangan: '-'
          },
          {
            jenis: 'Barack',
            jumlah: 660.00, 
            satuan: 'Sqm',
            keterangan: '-'
          },
          {
            jenis: 'Gedung Fasilitas',
            jumlah: 660.00,
            satuan: 'Sqm',
            keterangan: '-'
          },
        ],
        center: { lat:-7.779047, lng: 110.416957 },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
        allPaths: [],
        mode: 'hexa',
        marker: false,
        mapMode: false,
        breadcrumbs: [
          {
            text: 'Dashboard',
            exact : true,
            to: { name: 'home' },
          },
          {
            text: 'Maps',
            exact : true,
            to: { name: 'map' },
          },
          {
            text: 'Logistic',
            disabled: true,
          },
        ],
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
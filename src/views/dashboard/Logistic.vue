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
                <!-- <v-flex xs12 sm4>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Daerah Terdampak</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <gmap-map :center="center" :options="{zoomControl: true, draggable:true,mapTypeControl: false,scaleControl: false,streetViewControl: false,rotateControl: true,fullscreenControl: true,disableDefaultUi: true }" :zoom="18" style="width: 100%;height:270px;margin-bottom:16px">
                                <gmap-polygon :options="options" :paths="paths" :draggable="false" :editable="false" >
                                </gmap-polygon>
                            </gmap-map>
                        </div>
                    </v-card>
                </v-flex> -->
                <v-flex xs12 sm12>
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
                            :items-per-page="20"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Bantuan Sandang</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="detailSandang"
                            :items="sandang"
                            :items-per-page="20"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Pakaian Ibadah</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="pakaianIbadah"
                            :items="itemIbadah"
                            :items-per-page="20"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Kebutuhan Sandang Lain</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="sandangLain"
                            :items="itemSandangLain"
                            :items-per-page="20"
                            class="elevation-1"
                        ></v-data-table>
                        </div>
                    </v-card>
                    <v-card style="margin:10px;box-shadow: 0px 2px 4px rgba(50, 50, 71, 0.06), 0px 2px 2px rgba(50, 50, 71, 0.06);border: 1px solid #E8E8E8;">
                        <div class="card-header">
                            <h2 style="margin-left:16px">Bantuan Air Bersih dan Sanitasi</h2>
                        </div>
                        <v-divider></v-divider>
                        <div class="card-body">
                            <v-data-table
                            hide-default-footer
                            :headers="sanitasi"
                            :items="itemSanitasi"
                            :items-per-page="20"
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
        sanitasi: [
          {
            text: 'Jenis Pengadaan',
            align: 'start',
            sortable: false,
            value: 'jenis',
          },
          { text: 'Jumlah', value: 'jumlah' },
          { text: 'satuan', value: 'satuan' },
          { text: 'Keterangan', value: 'keterangan' }
        ],
        detailSandang: [
          {
            text: 'Jenis Sandang',
            align: 'start',
            sortable: false,
            value: 'jenisSandang',
          },
          { text: 'Kelamin', value: 'kelamin' },
          { text: 'Usia', value: 'usia' },
          { text: 'Jumlah', value: 'jumlahSandang' },
          { text: 'satuan', value: 'satuanSandang' },
        ],
        pakaianIbadah: [
          {
            text: 'Agama',
            align: 'start',
            sortable: false,
            value: 'agama',
          },
          { text: 'Kelamin', value: 'kelamin' },
          { text: 'Jumlah', value: 'jumlahSandang' },
          { text: 'satuan', value: 'satuanSandang' },
        ],
        sandangLain: [
          {
            text: 'Jenis Sandang',
            align: 'start',
            sortable: false,
            value: 'jenis',
          },
          { text: 'Jumlah', value: 'jumlah' },
          { text: 'satuan', value: 'satuan' },
          { text: 'Keterangan', value: 'keterangan' }
        ],
        itemSanitasi:[
          {
            jenis: 'Air Bersih',
            jumlah: 0,
            satuan: 'Liter',
            keterangan: '3 Hari Pertama'
          },
          {
            jenis: 'Air Bersih',
            jumlah: 0,
            satuan: 'Liter/Hari',
            keterangan: 'H+3'
          },
          {
            jenis: 'Air Minum',
            jumlah: 0,
            satuan: 'Liter/Orang',
            keterangan: '-'
          },
          {
            jenis: 'Tempat Sampah',
            jumlah: 0,
            satuan: 'Liter',
            keterangan: '-'
          },
          {
            jenis: 'Jamban',
            jumlah: 0,
            satuan: 'Jamban',
            keterangan: '20 Orang/Jamban'
          },
          {
            jenis: 'Tempat Cuci Pakaian',
            jumlah: 0,
            satuan: 'Tempat Cuci',
            keterangan: '100 Orang/Tempat Cuci'
          },
        ],
        itemSandangLain:[
          {
            jenis: 'Selimut',
            jumlah: 0,
            satuan: 'Buah',
            keterangan: '-'
          },
          {
            jenis: 'Alat tidur',
            jumlah: 0,
            satuan: 'Buah',
            keterangan: '-'
          },
          {
            jenis: 'Tongkat Lansia',
            jumlah: 0,
            satuan: 'Buah',
            keterangan: '-'
          },
          {
            jenis: 'Sabun mandi',
            jumlah: 0,
            satuan: 'Buah/Minggu',
            keterangan: 'sabun batang 70 Gram'
          },
          {
            jenis: 'Sabun cuci pakaian',
            jumlah: 0,
            satuan: 'Gram/Minggu',
            keterangan: 'sabun cuci 50 Gram'
          },
          {
            jenis: 'Pembalut',
            jumlah: 0,
            satuan: 'Buah',
            keterangan: '-'
          },
          {
            jenis: 'Popok Cuci',
            jumlah: 0,
            satuan: 'Buah',
            keterangan: '-'
          },
          {
            jenis: 'Sikat dan pasta gigi',
            jumlah: 0,
            satuan: 'Buah',
            keterangan: '-'
          },
        ],
        itemIbadah:[
          {
            agama: 'Katholik',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            agama: 'Kristen',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            agama: 'Budha',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'pria'
          },{
            agama: 'Hindu',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            agama: 'Islam',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            agama: 'Konghucu',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            agama: 'Katholik',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            agama: 'Kristen',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            agama: 'Budha',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },{
            agama: 'Hindu',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            agama: 'Islam',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            agama: 'Konghucu',
            jumlahSandang: 0,
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
        ],
        sandang:[
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '0-5',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '6-11',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '12-25',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '26-45',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '46-65',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '>66',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '0-5',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '6-11',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '12-25',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '26-45',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '46-65',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'pakaian',
            jumlahSandang: 0,
            usia: '>66',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'seragam',
            jumlahSandang: 0,
            usia: '5-11',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'seragam',
            jumlahSandang: 0,
            usia: '12-25',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'seragam',
            jumlahSandang: 0,
            usia: '5-11',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'seragam',
            jumlahSandang: 0,
            usia: '12-25',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'sepatu',
            jumlahSandang: 0,
            usia: '5-11',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'sepatu',
            jumlahSandang: 0,
            usia: '12-25',
            satuanSandang: 'buah',
            kelamin: 'pria'
          },
          {
            jenisSandang: 'sepatu',
            jumlahSandang: 0,
            usia: '5-11',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          {
            jenisSandang: 'sepatu',
            jumlahSandang: 0,
            usia: '12-25',
            satuanSandang: 'buah',
            kelamin: 'wanita'
          },
          
        ],
        penampungan: [
          {
            jenis: 'Tenda',
            jumlah: 0,
            satuan: 'tenda',
            keterangan: 'Tenda BNBP Luas 72 Sqm'
          },
          {
            jenis: 'Barack',
            jumlah: 0,
            satuan: 'Sqm',
            keterangan: '-'
          },
          {
            jenis: 'Gedung Fasilitas',
            jumlah: 0,
            satuan: 'Sqm',
            keterangan: '-'
          },
        ],
        pangan: [
          {
            jenis: 'Beras',
            jumlah: 0,
            satuan: 'Gram/Hari',
            keterangan: '-'
          },
          {
            jenis: 'Makanan Siap Saji',
            jumlah: 0, 
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Panci Besar',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Baskom',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Pisau Dapur',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Centong Kayu',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Ember Terbuka (40 Liter)',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Ember Terbuka (20 Liter)',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Jerigen (20 liter)',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Piring Makan',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Sendok Makan',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },{
            jenis: 'Cangkir / Gelas',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },{
            jenis: 'Botol Susu Bayi',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },{
            jenis: 'Kompor ,Bahan Bakar dan Penyimpanan bahan Bakar',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },{
            jenis: 'Lampu Lentera',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },
          {
            jenis: 'Lilin',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },{
            jenis: 'lainya',
            jumlah: 0,
            satuan: 'item',
            keterangan: '-'
          },

        ],
        tenda: null,
        barack: null,
        gedungFasilitas: null,
        beras: null,
        makananSiapSaji: null,
        panciBesar: null,
        baskom: null,
        pisauDapur: null,
        centongKayu: null,
        emberTertutup40L: null,
        emberTerbuka20L: null,
        jerigen20L: null,
        piringMakan: null,
        sendokMakan: null,
        cangkirGelas: null,
        botolSusu: null,
        kompor: null,
        lampuLentera: null,
        lilin:null,
        peneranganLainnya: null,
        pakaianPriaA: null,
        pakaianPriaB: null,
        pakaianPriaC: null,
        pakaianPriaD: null,
        pakaianPriaE: null,
        pakaianPriaF: null,
        pakaianWanitaA: null,
        pakaianWanitaB: null,
        pakaianWanitaC: null,
        pakaianWanitaD: null,
        pakaianWanitaE: null,
        pakaianWanitaF: null,
        seragamPriaB:null,
        seragamPriaC:null,
        seragamWanitaB:null,
        seragamWanitaC:null,
        sepatuPriaB:null,
        sepatuPriaC:null,
        sepatuWanitaB:null,
        sepatuWanitaC:null,
        ibadahPriaKatholik:null,
        ibadahPriaKristen:null,
        ibadahPriaBudha:null,
        ibadahPriaHindu:null,
        ibadahPriaIslam:null,
        ibadahPriaKonghucu:null,
        ibadahWanitaKatholik:null,
        ibadahWanitaKristen:null,
        ibadahWanitaBudha:null,
        ibadahWanitaHindu:null,
        ibadahWanitaIslam:null,
        ibadahWanitaKonghucu:null,
        selimut:null,
        alatTidur:null,
        tongkatLansia:null,
        sabun:null,
        sabuCuciPakaian:null,
        pembalut:null,
        popokCuci:null,
        sikatPastaGigi:null,
        airBersih3HariAwal:null,
        airBersih3HariNext:null,
        airMinum:null,
        tempatSampah:null,
        jamban:null,
        tempatCuciPakaian:null,
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
  methods:{
     async getLogisticData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiurl + '/generate-logistic/'+this.$route.params.type,config).then(response =>{
            this.penampungan[0].jumlah = response.data.tenda
            this.penampungan[1].jumlah = response.data.barack
            this.penampungan[2].jumlah = response.data.gedung_fasilitas
            this.pangan[0].jumlah = response.data.beras
            this.pangan[1].jumlah = response.data.makanan_siap_saji
            this.pangan[2].jumlah = response.data.panci_besar
            this.pangan[3].jumlah = response.data.baskom
            this.pangan[4].jumlah = response.data.pisau_dapur
            this.pangan[5].jumlah = response.data.centong_kayu
            this.pangan[6].jumlah = response.data.ember_tertutup_40l
            this.pangan[7].jumlah = response.data.ember_terbuka_20l
            this.pangan[8].jumlah = response.data.jerigen_20l
            this.pangan[9].jumlah = response.data.piring_makan
            this.pangan[10].jumlah = response.data.sendok_makan
            this.pangan[11].jumlah = response.data.cangkir_gelas
            this.pangan[12].jumlah = response.data.botol_susu
            this.pangan[13].jumlah = response.data.kompor
            this.pangan[14].jumlah = response.data.lampu_lentera
            this.pangan[15].jumlah = response.data.lilin
            this.pangan[16].jumlah = response.data.penerangan_lainnya
            this.sandang[0].jumlahSandang = response.data.pakaian_pria_a
            this.sandang[1].jumlahSandang = response.data.pakaian_pria_b
            this.sandang[2].jumlahSandang = response.data.pakaian_pria_c
            this.sandang[3].jumlahSandang = response.data.pakaian_pria_d
            this.sandang[4].jumlahSandang = response.data.pakaian_pria_e
            this.sandang[5].jumlahSandang = response.data.pakaian_pria_f
            this.sandang[6].jumlahSandang = response.data.pakaian_wanita_a
            this.sandang[7].jumlahSandang = response.data.pakaian_wanita_b
            this.sandang[8].jumlahSandang = response.data.pakaian_wanita_c
            this.sandang[9].jumlahSandang = response.data.pakaian_wanita_d
            this.sandang[10].jumlahSandang = response.data.pakaian_wanita_e
            this.sandang[11].jumlahSandang = response.data.pakaian_wanita_f
            this.sandang[12].jumlahSandang = response.data.seragam_pria_b
            this.sandang[13].jumlahSandang = response.data.seragam_pria_c
            this.sandang[14].jumlahSandang = response.data.seragam_wanita_b
            this.sandang[15].jumlahSandang = response.data.seragam_wanita_c
            this.sandang[16].jumlahSandang  = response.data.sepatu_pria_b
            this.sandang[17].jumlahSandang  = response.data.sepatu_pria_c
            this.sandang[18].jumlahSandang = response.data.sepatu_wanita_b
            this.sandang[19].jumlahSandang = response.data.sepatu_wanita_c
            this.itemIbadah[0].jumlahSandang  = response.data.ibadah_pria_katholik
            this.itemIbadah[1].jumlahSandang = response.data.ibadah_pria_kristen
            this.itemIbadah[2].jumlahSandang = response.data.ibadah_pria_budha
            this.itemIbadah[3].jumlahSandang = response.data.ibadah_pria_hindu
            this.itemIbadah[4].jumlahSandang = response.data.ibadah_pria_islam
            this.itemIbadah[5].jumlahSandang = response.data.ibadah_pria_konghucu
            this.itemIbadah[6].jumlahSandang = response.data.ibadah_wanita_katholik
            this.itemIbadah[7].jumlahSandang = response.data.ibadah_wanita_kristen
            this.itemIbadah[8].jumlahSandang = response.data.ibadah_wanita_budha
            this.itemIbadah[9].jumlahSandang = response.data.ibadah_wanita_hindu
            this.itemIbadah[10].jumlahSandang = response.data.ibadah_wanita_islam
            this.itemIbadah[11].jumlahSandang= response.data.ibadah_wanita_konghucu
            this.itemSandangLain[0].jumlah = response.data.selimut
            this.itemSandangLain[1].jumlah = response.data.alat_tidur
            this.itemSandangLain[2].jumlah = response.data.tongkat_lansia
            this.itemSandangLain[3].jumlah = response.data.sabun
            this.itemSandangLain[4].jumlah = response.data.sabun_cuci_pakaian
            this.itemSandangLain[5].jumlah = response.data.pembalut
            this.itemSandangLain[6].jumlah = response.data.popok_cuci
            this.itemSandangLain[7].jumlah = response.data.sikat_pasta_gigi
            this.itemSanitasi[0].jumlah = response.data.air_bersih_3_hari_awal
            this.itemSanitasi[1].jumlah = response.data.air_bersih_3_hari_next
            this.itemSanitasi[2].jumlah = response.data.air_minum
            this.itemSanitasi[3].jumlah = response.data.tempat_sampah
            this.itemSanitasi[4].jumlah = response.data.jamban
            this.itemSanitasi[5].jumlah = response.data.tempat_cuci_pakaian
        })
    },
  },
  mounted(){
      this.getLogisticData()
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
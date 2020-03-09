<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            md="9"
          >
            <v-card  class="card-bg">
              <v-row>
                <v-col
                cols="12"
                md="6"
              >
                <div style="padding:60px">
                  <v-img width="238" src="../assets/logo.svg"></v-img>

                  <div style="margin-top:100px">
                  <v-text-field
                    label="username"
                    outlined
                    v-model="form.username"
                  ></v-text-field>
                  <v-text-field
                    label="password"
                    outlined
                    type="password"
                    v-model="form.password"
                  ></v-text-field>
                    <v-btn
                    elevation="0"
                    block
                    dark
                    height="50"
                    color="#007EFF"
                    @click="loginAdmin()"
                    >Sign IN</v-btn>
                </div>
                <div style="margin-top:15px">
                  <small style="float:right"><span>Forget Your Password</span>&nbsp;<a href="">Resend Email</a></small>
                </div>
                </div>
              </v-col>
              <v-col
                cols="12"
                md="6"
                style="padding:0"
              >
                <div class="login-image">
                </div>
              </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model='snackbar'
        :color='color'
        :multi-line='true'
        :timeout='3000'
      >
        {{ text }}
        <v-btn color='indigo' text @click='snackbar = false'>Tutup</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import store from '../store'
  export default {
    data:() =>({
      form:{
        username: null,
        password: null,
        client_id: 2,
        client_secret: 'kNIZ3gxtDFIsfialH37QVGImNUQWHp6bEAQdytJV',
        grant_type: 'password'
      },
      snackbar: false,
      color: null,
      text: ''
    }),
    methods:{
      loginAdmin(){
      let uri = this.$apiLogin + '/token'
      this.$http
        .post(uri, this.form)
        .then(response => {
          if (response.data.access_token) {
            store.commit('loginUser')
            this.snackbar = true
            this.color = 'green'
            this.text = 'Berhasil Login'
            localStorage.setItem('token', response.data.access_token)
            this.$router.push({ name: 'home' })
          } else {
            this.snackbar = true
            this.color = 'red'
            this.text = 'Akun tidak terdaftar'
          }
        })
        .catch(error => {
          this.snackbar = true
          this.text = error.response.data.message
          this.color = 'red'
          this.load = false
        })
      }
    }
  }
</script>

<style>
.login-image{
  background-image: url("../assets/login-bg.svg");
  height: 100%; 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.card-bg{
  border: 1px solid #F2F2F2;
  box-sizing: border-box;
  box-shadow: 0px 0px 26px rgba(10, 10, 10, 0.3);
  border-radius: 200px;
}
.login-button{
  background:#007EFF;
}
</style>
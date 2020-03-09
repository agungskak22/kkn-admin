<template>
  <div id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      style="background:#414550"
    >
      <v-list dense>
        <v-list-item link>
          <v-img width="170" src="../assets/header-logo.svg"></v-img>
        </v-list-item>
      </v-list>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" @click="$router.push({ name: item.to }).catch(err => {})" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="#FFFF"
      class="app-bar-shadow"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
     <VContent>
        <router-view />
    </VContent>
  </div>
</template>

<script>
// import store from '../store'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
      {
        id: 1,
        icon: 'mdi-view-dashboard',
        text: 'Dashboard',
        to: 'home'
      },
      {
        id: 2,
        icon: 'mdi-account-multiple-outline',
        text: 'Pengelolaan Pengguna',
        to: 'user'
      },
      {
        id: 3,
        icon: 'mdi-google-maps',
        text: 'Maps',
        to: 'map'
      }
    ]
    }),
  }
</script>

<style>
.app-bar-shadow{
    box-shadow: 0px 4px 1px rgba(42, 45, 51, 0.04);
}
</style>

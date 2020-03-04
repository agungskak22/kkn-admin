<template>
  <v-app id="inspire">
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
        <div style="margin-top:30px">
            <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#FFFF"
      class="app-bar-shadow"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style>
.app-bar-shadow{
    box-shadow: 0px 4px 1px rgba(42, 45, 51, 0.04);
}
</style>
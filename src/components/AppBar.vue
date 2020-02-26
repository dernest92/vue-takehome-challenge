<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="primary"
    dark
  >
    <v-toolbar-title class="ml-0 mr-4">
      <router-link to="/" class="logo-img">
        <v-img src="../assets/ccc-logo-white.png" class="logo-img" />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-text-field
      flat
      dense
      solo-inverted
      hide-details
      rounded
      prepend-inner-icon="search"
      label="Search GitHub"
      v-model="searchStr"
      @keyup.enter.native="search"
    />
    <v-spacer />
    <v-btn
      href="https://github.com/dernest92/vue-takehome-challenge"
      target="_blank"
      icon
      ><v-icon>mdi-github-circle</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      searchStr: ""
    };
  },
  methods: {
    async search() {
      const { searchStr } = this;
      if (this.$route.path !== "/search") {
        this.$router.push("/search");
      }
      await this.$store.dispatch("fetchSearchResults", { searchStr, page: 1 });
      this.searchStr = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-img {
  cursor: pointer;
  width: 100px;
}
</style>

<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-btn icon to="/">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="search"
      label="Search"
      v-model="searchStr"
      @keyup.enter.native="search"
    ></v-text-field>
    <v-spacer></v-spacer>
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

<template>
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
      const fullPath = `/search?q=${encodeURI(searchStr)}&p=1`;
      this.searchStr = "";
      if (this.$route.fullPath !== fullPath) return;
      this.$router.push(fullPath);
    }
  }
};
</script>

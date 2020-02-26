<template>
  <div>
    <v-divider></v-divider>
    <v-list-item :key="item.title">
      <v-list-item-avatar>
        <v-img :src="item.avatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          ><a :href="item.html_url" target="_blank">{{
            item.full_name
          }}</a></v-list-item-title
        >
        <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="toggleSelect">
              <v-icon color="error" v-if="isSelected">mdi-minus</v-icon>
              <v-icon color="success" v-else>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>{{ isSelected ? "Remove Repo" : "Add Repo" }}</span>
        </v-tooltip>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    isSelected() {
      return this.$store.state.repoList.includes(this.item.full_name);
    }
  },
  methods: {
    toggleSelect() {
      if (this.isSelected) {
        this.$store.dispatch("removeRepo", this.item.full_name);
      } else {
        this.$store.dispatch("addRepo", this.item.full_name);
      }
    }
  }
};
</script>

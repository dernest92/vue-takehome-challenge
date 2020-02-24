<template>
  <div>
    <v-divider></v-divider>
    <v-list-item :key="item.title">
      <v-list-item-avatar>
        <v-img :src="item.avatar"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          ><a :href="item.html_url">{{ item.full_name }}</a></v-list-item-title
        >
        <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

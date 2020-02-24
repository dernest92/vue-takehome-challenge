import Vue from "vue";
import Router from "vue-router";

const TableView = () =>
  import(/* webpackChunkName: "table" */ "./views/DataTable.vue");
const ResultsView = () =>
  import(/* webpackChunkName: "table" */ "./views/ResultsView.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: TableView
    },
    {
      path: "/search",
      name: "search-results",
      component: ResultsView
    }
  ]
});

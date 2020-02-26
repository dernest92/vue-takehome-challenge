import Vue from "vue";
import Router from "vue-router";

const DataTableView = () =>
  import(/* webpackChunkName: "data-table-view" */ "./views/DataTableView.vue");
const ResultsView = () =>
  import(/* webpackChunkName: "results-view" */ "./views/ResultsView.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: DataTableView
    },
    {
      path: "/search",
      name: "search-results",
      component: ResultsView
    }
  ]
});

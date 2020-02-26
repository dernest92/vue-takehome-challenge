import Vue from "vue";
import Vuex from "vuex";
import fetchRepoData from "./services/fetchRepoData";
import fetchSearchData from "./services/fetchSearchData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchCount: 0,
    queryString: "",
    loadingResults: false,
    searchPage: 1,
    repoList: [
      "vuejs/vue",
      "facebook/react",
      "sveltejs/svelte",
      "expressjs/express",
      "tensorflow/tensorflow",
      "bradtraversy/mysubscribers"
    ],
    repoData: [],
    searchResults: []
  },
  getters: {},
  actions: {
    removeRepo({ state, commit }, repoName) {
      const repoList = state.repoList.filter(r => r !== repoName);
      const repoData = state.repoData.filter(r => r.repoFullName !== repoName);
      commit("SET_REPO_LIST", repoList);
      commit("SET_REPO_DATA", repoData);
    },

    addRepo({ state, commit }, repoName) {
      const repoList = [...state.repoList, repoName];
      commit("SET_REPO_LIST", repoList);
    },

    async fetchRepos({ state, commit }) {
      const { repoList } = state;
      const data = await Promise.all(
        repoList.map(async r => {
          return fetchRepoData(r);
        })
      );
      commit("SET_REPO_DATA", data);
    },

    async fetchSearchResults({ commit, state }, { searchStr, page }) {
      const queryString = searchStr ? searchStr : state.queryString;
      const urlString = queryString.split(" ").join("+");

      commit("SET_LOADING", true);
      commit("SET_QUERY_STRING", queryString);

      const { trimmedData, total_count } = await fetchSearchData(
        urlString,
        page
      );

      commit("SET_SEARCH_RESULTS", trimmedData);
      commit("SET_SEARCH_COUNT", total_count);
      commit("SET_LOADING", false);
    }
  },
  mutations: {
    SET_REPO_DATA(state, data) {
      state.repoData = [...data];
    },
    SET_SEARCH_MODAL(state, val) {
      state.showSearchModal = val;
    },
    SET_SEARCH_RESULTS(state, results) {
      state.searchResults = results;
    },
    SET_SEARCH_COUNT(state, count) {
      state.searchCount = count;
    },
    SET_QUERY_STRING(state, str) {
      state.queryString = str;
    },
    SET_REPO_LIST(state, list) {
      state.repoList = list;
    },
    SET_LOADING(state, val) {
      state.loadingResults = val;
    }
  }
});

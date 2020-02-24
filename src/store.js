import Vue from "vue";
import Vuex from "vuex";
import fetchRepoData from "./services/fetchRepoData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchCount: 0,
    queryString: "",
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
      commit("SET_REPO_LIST", repoList);
    },
    addRepo({ state, commit }, repoName) {
      const repoList = [...state.repoList, repoName];
      commit("SET_REPO_LIST", repoList);
    },
    async fetchDefaultRepos({ state, commit }) {
      const { repoList } = state;
      const data = await Promise.all(
        repoList.map(async r => {
          return fetchRepoData(r);
        })
      );
      commit("SET_REPO_DATA", data);
    },
    toggleSearchModal({ commit, state }) {
      commit("SET_SEARCH_MODAL", !state.showSearchModal);
    },
    async fetchSearchResults({ commit, state }, { searchStr, page }) {
      const queryString = searchStr
        ? searchStr.split(" ").join("+")
        : state.queryString;

      const searchRes = await fetch(
        `https://api.github.com/search/repositories?q=${queryString}&page=${page}&per_page=25`
      );

      const searchData = await searchRes.json();
      const trimmedData = searchData.items.map(itm => {
        const { html_url, description, full_name, stargazers_count } = itm;
        const avatar = itm.owner.avatar_url;
        return { html_url, description, full_name, stargazers_count, avatar };
      });
      commit("SET_SEARCH_RESULTS", trimmedData);
      commit("SET_SEARCH_COUNT", searchData.total_count);
      commit("SET_QUERY_STRING", queryString);
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
    }
  }
});

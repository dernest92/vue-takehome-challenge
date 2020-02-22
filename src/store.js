import Vue from "vue";
import Vuex from "vuex";
import fetchRepoData from "./services/fetchRepoData";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    testMsg: "hello from vuex",
    repoList: [
      //   { user: "vuejs", repo: "vue" },
      //   { user: "facebook", repo: "react" },
      //   { user: "sveltejs", repo: "svelte" },
      //   { user: "expressjs", repo: "express" },
      //   { user: "tensorflow", repo: "tensorflow" },
      //   { user: "bradtraversy", repo: "mysubscribers" }
    ],
    repoData: []
  },
  getters: {},
  actions: {
    async fetchDefaultRepos({ state, commit }) {
      const { repoList } = state;
      const data = await Promise.all(
        repoList.map(async r => {
          return fetchRepoData(r.user, r.repo);
        })
      );
      commit("SET_REPO_DATA", data);
    }
  },
  mutations: {
    SET_REPO_DATA(state, data) {
      state.repoData = [...data];
    }
  }
});

import Vue from 'vue'
import Vuex from 'vuex'

import { getCharacters, searchCharacter } from '@/services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    charactersList: [],
    count: 0,
    page: 1,

    loading: false,
    isEmpty: false,
    hasError: false,
  },

  mutations: {
    SET_CHARACTERS(state, data) {
      state.charactersList = data;
    },

    SET_COUNT(state, data) {
      state.count = data;
    },

    SET_PAGE(state, page) {
      state.page = page;
    },

    SET_LOADING(state, value) {
      state.loading = value;
    }
  },

  actions: {
    setCharacters({ commit, state }) {
      commit('SET_LOADING', true);

      getCharacters(state.page)
        .then((res) => {
          const data = res?.data;
          if (!data || !data.results || !data.count) return

          commit('SET_CHARACTERS', data.results);
          commit('SET_COUNT', data.count);
        })
        .catch(() => {

        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    },

    setSearch({ commit, state }, searchTerm) {
      commit('SET_LOADING', true);

      searchCharacter(searchTerm, state.page)
        .then((res) => {
          const data = res?.data;
          if (!data || !data.results || !data.count) return

          commit('SET_CHARACTERS', data.results);
          commit('SET_COUNT', data.count);
        })
        .catch(() => {
          
        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    },
    
    setPage({ commit }, page) {
      commit('SET_PAGE', page)
    }
  },

  getters: {
    getCharactersList: state => state.charactersList,
    getCount: state => state.count,
    getPage: state => state.page,

    getLoading: state => state.loading,
    getIsEmpty: state => state.isEmpty,
    getHasError: state => state.hasError,
  }
})

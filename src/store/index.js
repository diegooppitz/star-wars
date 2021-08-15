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
    },

    SET_IS_EMPTY(state, value) {
      state.isEmpty = value;
    }
  },

  actions: {
    setCharacters({ commit, state }) {
      commit('SET_LOADING', true);

      getCharacters(state.page)
        .then((res) => {
          const data = res?.data;
          if (!data || !data.results || data.results.length === 0) {
            commit('SET_IS_EMPTY', true)
            return
          }

          commit('SET_IS_EMPTY', false);
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
      searchCharacter(searchTerm, state.page)
        .then((res) => {
          const data = res?.data;

          if (!data || !data.results || data.results.length === 0) {
            commit('SET_IS_EMPTY', true);
            return
          }

          commit('SET_IS_EMPTY', false);
          commit('SET_CHARACTERS', data.results);
          commit('SET_COUNT', data.count);
        })
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

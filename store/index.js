export const state = () => ({
  token: null,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },

  clearToken(state) {
    state.token = null;
  },
};

export const actions = {
  login({ commit }, token) {
    commit("setToken", token);
  },

  clear({ commit }) {
    commit("clearToken");
  },
};

export const getters = {
  hasToken: (s) => !!s.token,

  getToken(state) {
    if (state.token) {
      const result = state.token.charAt(0).toUpperCase() + state.token.slice(1);
      return result;
    }
  },
};

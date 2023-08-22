import { createStore } from 'vuex';

// Favorites module
const favoritesModule = {
  state() {
    return {
      favoritePictures: [], 
    };
  },
  mutations: {
    addFavoritePicture(state, picture) {
      state.favoritePictures.push(picture); 
    },
  },
  actions: {
    saveFavoritePicture({ commit }, picture) {
      commit('addFavoritePicture', picture);
    },
  },
  getters: {
    favoritePictures(state) {
      return state.favoritePictures;
    },
  },
};


const store = createStore({
  modules: {
    favorites: favoritesModule,
  },
});

export default store;

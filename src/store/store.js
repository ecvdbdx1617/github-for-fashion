import Vue from 'vue';
import Vuex from 'vuex';

import garmentModule from './garment';
import loginModule from './login';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    garment: garmentModule,
    login: loginModule,
  },
});

export default store;
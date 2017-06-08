import Vue from 'vue';
import Vuex from 'vuex';

import garmentModule from './garment';
import loginModule from './login';
import errorModule from './error';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    garment: garmentModule,
    login: loginModule,
    error: errorModule,
  },
});

export default store;
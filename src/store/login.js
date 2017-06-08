import GitHub from 'github-api';
import EventBus from '../eventBus';

/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
const state = {
  token: localStorage.getItem('token'),
  login: localStorage.getItem('login'),
  name: localStorage.getItem('name'),
};

const getters = {
  token: state => state.token,
  login: state => state.login,
  name: state => state.name,
};

const mutations = {
  setLogin: (state, { token, login, name }) => {
    state.token = token;
    state.login = login;
    state.name = name;
  },
  clearLogin: (state) => {
    state.token = '';
    state.login = '';
    state.name = '';
  },
};

const actions = {
  login: (context, token) => {
    const gh = new GitHub({ token });

    gh.getUser().getProfile()
      .then((user) => {
        const login = user.data.login;
        const name = user.data.name;

        context.commit('setLogin', { token, login, name });

        localStorage.setItem('token', token);
        localStorage.setItem('login', login);
        localStorage.setItem('name', name);
      })
      .catch((error) => {
        EventBus.$emit('showError', error);
      });
  },
  logout: (context) => {
    context.commit('clearLogin');

    localStorage.clear();
  },
};

export default { state, getters, mutations, actions };

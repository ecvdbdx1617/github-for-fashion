/* eslint-disable no-shadow */
const state = {
  message: '',
  duration: 5000,
  active: false,
};

const getters = {
  message: state => state.message,
  duration: state => state.duration,
  active: state => state.active,
};

const mutations = {
  show: (state, message) => {
    state.message = message;
    state.active = true;
  },
  hide: (state) => {
    state.active = false;
  },
};

const actions = {
  showError: (context, { message, duration }) => {
    context.commit('show', message);

    setTimeout(() => {
      context.commit('hide');
    }, duration || context.state.duration);
  },
  hideError: (context) => {
    context.commit('hide');
  },
};

export default { state, getters, mutations, actions };

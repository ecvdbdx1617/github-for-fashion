/* eslint-disable no-shadow */
const state = {
  garments: [],
};

const getters = {
  garments: state => state.garments,
  garment: state => id => state.garments.find(garment => garment.id === id),
};

const mutations = {
  addGarment: (state, garment) => {
    state.garments.push(garment);
  },
  clearGarments: (state) => {
    state.garments = [];
  },
};

const actions = {
  addGarment: (context, repo) => {
    const garment = {
      id: repo.id,
      title: repo.name,
      creator: repo.owner.login,
      date: repo.created_at,
      commit: {
        contributors: 'me',
      },
      image: 'test',
    };
    context.commit('addGarment', garment);
  },
  clearGarments: (context) => {
    context.commit('clearGarments');
  },
};

export default { state, getters, mutations, actions };

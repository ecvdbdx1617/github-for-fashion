<template>
  <div class="home">
    <main-card :data="mainCard"></main-card>
    <div class="mdc-layout-grid">
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import LoginStore from '../../loginStore';
  import EventBus from '../../eventBus';

  import Card from '../components/Card.vue';
  import MainCard from '../components/MainCard.vue';

  export default {
    name: 'home',
    data() {
      return {
        garments: [],
        mainCard: {
          title: 'Patron Jacket zero waste',
          artist: 'BramyVony',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          img: 'https://www.outdoorresearch.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/244897_0936.jpg',
          location: 'Bordeaux - France',
          contributor: 2,
        },
      };
    },
    beforeCreate() {
      axios.get('http://localhost:3000/garments/')
        .then((response) => {
          this.garments = response.data;
        })
        .catch(error => this.showError(error.message));
      const gh = new GitHub({
        token: LoginStore.state.token,
      });

      const remoteRepo = gh.getRepo('ecvdbdx1617', 'github-for-fashion');
      // const vm = this;         this will be usefull later
      remoteRepo.getContents('master', 'content/cover.json', false).then((file) => {
        let myJson = decodeURIComponent(escape(window.atob(file.data.content)));
        myJson = JSON.parse(myJson);
        Object.keys(myJson).forEach((key) => {
          let user;
          let repo;
          if (key === 'primary') {
            [user, repo] = String(myJson.primary).split('/');
            console.log(user);
            console.log(repo);
            // We need to define the action we will execute with the user and repo from primary
          } else {
            Object.keys(myJson.secondary).forEach((secondaryKey) => {
              [user, repo] = String(myJson.secondary[secondaryKey]).split('/');
              console.log(user);
              console.log(repo);
              // We need to define the action we will execute for each user and repo from secondary
            });
          }
        });
      });
    },
    methods: {
      showError(error) {
        EventBus.$emit('showError', error);
      },
    },
    components: {
      Card,
      MainCard,
    },
  };
</script>

<style>
</style>

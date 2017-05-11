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
          title: '',
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
        let myJson = atob(file.data.content);
        myJson = JSON.parse(myJson);
        console.log(myJson);
        /* eslint-disable prefer-const */
        let user;
        let repo;
        [user, repo] = String(myJson.primary).split('/');
        console.log(user);
        console.log(repo);
        const primaryRepo = gh.getRepo(user, repo);
        const repoDetails = primaryRepo.getDetails();
        console.log(repoDetails);
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

<template>
  <div class="home">
    <main-card :data="mainCard"></main-card>
    <div class="mdc-layout-grid">
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
  import Github from 'github-api';
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
          artist: '',
          description: '',
          img: 'https://www.outdoorresearch.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/244897_0936.jpg',
          contributor: '',
        },
      };
    },
    beforeCreate() {
      axios.get('http://localhost:3000/garments/')
        .then((response) => {
          this.garments = response.data;
        })
        .catch(error => this.showError(error.message));
    },
    mounted() {
      const gh = new Github({
        token: LoginStore.state.token,
      });

      const remoteRepo = gh.getRepo('ecvdbdx1617', 'github-for-fashion');
      remoteRepo.getContents('master', 'content/cover.json', false).then((file) => {
        let myJson = atob(file.data.content);
        myJson = JSON.parse(myJson);
        /* eslint-disable prefer-const */
        /* eslint-disable no-unused-vars */
        let user = '';
        let repo = '';
        [user, repo] = String(myJson.primary).split('/');
        const primaryRepo = gh.getRepo('matthieu-brillaxis', 'test');
        primaryRepo.getDetails().then((response) => {
          const primaryGarment = response.data;
          this.mainCard.title = primaryGarment.name;
          this.mainCard.artist = primaryGarment.owner.login;
          this.mainCard.description = primaryGarment.description;
        });
        primaryRepo.getContributorStats().then((response) => {
          const primaryGarment = response.data[0];
          this.mainCard.contributor = primaryGarment.total;
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

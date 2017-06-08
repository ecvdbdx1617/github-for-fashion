<template>
  <div class="home">
    <main-card :data="mainCard"></main-card>
    <div class="mdc-layout-grid">
      <card v-for="garment in garments" :data="garment"></card>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Github from 'github-api';

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
          img: '',
          contributor: '',
        },
      };
    },
    computed: {
      ...mapGetters({
        token: 'token',
      }),
    },
    beforeCreate() {
      const gh = new Github({
        token: this.token,
      });

      const remoteRepo = gh.getRepo('ecvdbdx1617', 'github-for-fashion');
      remoteRepo.getContents('master', 'content/cover.json', false).then((file) => {
        let myJson = atob(file.data.content);
        myJson = JSON.parse(myJson);
        let [user, repo] = myJson.primary.split('/');
        const primaryRepo = gh.getRepo(user, repo);
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

        const garments = myJson.secondary.map((garment) => {
          [user, repo] = garment.split('/');
          const secondaryRepo = gh.getRepo(user, repo);
          const promise = secondaryRepo.getDetails();
          return promise;
        });
        Promise.all(garments).then((response) => {
          response.forEach((element) => {
            const card = {
              creation_date: element.data.created_at,
              creator: element.data.owner.login,
              description: element.data.description,
              id: element.data.id,
              title: element.data.name,
            };
            this.garments.push(card);
          });
        });
      });
    },
    methods: {
      ...mapActions({
        showError: 'showError',
      }),
    },
    components: {
      Card,
      MainCard,
    },
  };
</script>

<style>
</style>

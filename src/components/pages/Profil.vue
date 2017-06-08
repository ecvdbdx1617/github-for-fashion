<template>
  <div class="profil">
    <span>{{ user }}</span>
    <div class="mdc-layout-grid">
      <loader v-if="!dataIsLoaded"></loader>
      <card v-for="garment in garments" :data="garment" @cardDeleted="deleteCard"></card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GitHub from 'github-api';
import _ from 'lodash';

import Card from '../components/Card.vue';
import Loader from '../components/Loader.vue';

export default {
  name: 'profil',
  data() {
    return {
      user: this.$route.params.user,
      dataIsLoaded: false,
    };
  },
  computed: {
    ...mapGetters({
      garments: 'garments',
      token: 'token',
    }),
  },
  mounted() {
    const gh = new GitHub({
      token: this.token,
    });
    const user = gh.getUser(this.user);
    if (user) {
      user.listRepos((err, repos) => {
        if (repos) {
          repos.forEach((repo) => {
            const remoteRepo = gh.getRepo(this.user, repo.name);
            remoteRepo.getContents('master', 'garment-config.json', true)
            .then(() => {
              this.addGarment(repo);
              this.dataIsLoaded = true;
            }).catch((error) => {
              this.showError({ message: error.message });
            });
          });
        }
      });
    } else {
      this.showError({ message: 'You need to be connected to view this page' });
    }
  },
  components: {
    Card,
    Loader,
  },
  methods: {
    ...mapActions({
      addGarment: 'addGarment',
      showError: 'showError'
    }),
    deleteCard(id) {
      this.garments = _.reject(this.garments, { id });
    },
  },
};
</script>

<style>
</style>

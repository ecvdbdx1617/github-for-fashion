<template>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
    <div class="mdc-card">
      <button v-if="login && data.creator === login" v-on:click="showDialog" class="btn-remove"><i class="material-icons">clear</i></button>
      <router-link :to="{ name: 'Garment Detail', params: {user: data.creator, repo: data.title}}">
        <div class="mdc-card__media">
          <img :src="data.image">
        </div>
      </router-link>
      <div class="mdc-card__primary">
        <router-link :to="{ name: 'Garment Detail', params: {user: data.creator, repo: data.title}}">
          <div class="mdc-card__title mdc-card__title--large">{{data.title}}</div>
        </router-link>
        <div class="mdc-card__subtitle">{{data.creator}} on {{data.date | moment}}</div>
      </div>
      <div class="mdc-card__supporting-text">
        <div v-if="data.commit">{{data.commit.contributors}} Contributers</div>
      </div>
      <button v-if="login && data.creator !== login" v-on:click="fork">Copier sur mon profil</button>
    </div>
    <dialog-box @dialogDecline="declineDialog" @dialogConfirm="confirmDialog" v-show="dialog" :title="delete_title" :description="delete_desc"></dialog-box>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import GitHub from 'github-api';
import router from '../../router';
import DialogBox from './Dialog.vue';

export default {
  name: 'card',
  props: ['data'],
  filters: {
    moment: date => moment(date).format('L'),
  },
  data() {
    return {
      delete_title: 'Are you sure you want to delete this repo ?',
      delete_desc: 'This action is definitive',
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      token: 'token',
      login: 'login',
    }),
  },
  methods: {
    ...mapActions({
      showError: 'showError',
    }),
    fork() {
      const gh = new GitHub({
        token: this.token,
      });
      const remoteRepo = gh.getRepo(this.data.creator, this.data.title);
      remoteRepo.fork()
      .then((response) => {
        router.push({ name: 'Garment Detail', params: { user: this.login, repo: response.data.name } });
      }).catch((error) => {
        this.showError({ message: error });
      });
    },
    remove() {
      const gh = new GitHub({
        token: this.token,
      });
      const remoteRepo = gh.getRepo(this.data.creator, this.data.title);
      remoteRepo.deleteRepo()
      .then(() => {
        this.$emit('cardDeleted', this.data.id);
      }).catch((error) => {
        this.showError({ message: error });
      });
    },
    declineDialog() {
      this.dialog = false;
    },
    confirmDialog() {
      this.dialog = false;
      this.remove();
    },
    showDialog() {
      this.dialog = true;
    },
  },
  components: {
    DialogBox,
  },
};
</script>

<style>
.mdc-card{
  position:relative;
}
.btn-remove{
  position:absolute;
  top:5px;
  right:5px;
  border:none;
  background-color: transparent;
}
.btn-remove:hover{
  cursor:pointer;
  color:#c83131;
}
</style>

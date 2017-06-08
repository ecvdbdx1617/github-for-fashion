<template>
  <div class="mdc-snackbar" :class="{'mdc-snackbar--active': active}">
    <div class="mdc-snackbar__text">{{ message }}</div>
    <div class="mdc-snackbar__action-wrapper">
      <button type="button" class="mdc-button mdc-snackbar__action-button" v-on:click="hide">Close</button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'error',
    computed: {
      ...mapGetters({
        message: 'message',
        active: 'active',
      }),
    },
    methods: {
      ...mapActions({
        hide: 'hideError',
      }),
    },
  };
</script>

<style>
  .mdc-snackbar {
    padding: 10px 25px;
  }

  .mdc-snackbar__text {
    height: auto;
  }
</style>

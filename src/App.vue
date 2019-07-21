<template>
  <div id="app">
    <comp-header />
      <router-view />
    <comp-footer />
  </div>
</template>

<script>
import compHeader from './components/Header-Footer/Header';
import compFooter from './components/Header-Footer/Footer';

export default {
  name: 'app',
  components: {
    compHeader,
    compFooter
  },
  created() {
    this.$store.dispatch('admin/refreshToken');
  }
}
</script>

<style>
  @import "./assets/style.css";
</style>

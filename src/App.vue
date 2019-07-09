<template>
  <div id="app">
    <comp-header />
    content
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
  }
}
</script>

<style>
  @import "./assets/style.css";
</style>

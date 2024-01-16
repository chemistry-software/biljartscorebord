<template>
  <div id="app">
    <h2>De Club met Stootkracht</h2>
    <ScoreboardComponent />
  </div>
</template>

<script lang="ts">
import ScoreboardComponent from './components/ScoreboardComponent.vue';

export default {
  components: {
    ScoreboardComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
}
</style>


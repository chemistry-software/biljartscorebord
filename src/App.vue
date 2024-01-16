<template>
  <div id="app">
    <h1>Billiards Scoreboard</h1>
    <Scoreboard />
  </div>
</template>

<script>
import Scoreboard from './components/Scoreboard.vue';

export default {
  components: {
    Scoreboard
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


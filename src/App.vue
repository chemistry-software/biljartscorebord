<template>
  <div id="app">
    <HeaderComponent />
    <ScoreboardComponent />
  </div>
</template>

<script lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import ScoreboardComponent from './components/ScoreboardComponent.vue';

export default {
  components: {
    HeaderComponent,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>


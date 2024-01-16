<template>
	<div :class="{ 'current-player': isCurrentPlayer }">
    <h2>{{ playerName }} ({{ pointsNeeded }})</h2>
    <p>Punten: {{ points }}</p>
    <p>Moyenne: {{ (points / turnsTaken).toFixed(3) }}</p>
  </div>
</template>

<script>
export default {
  props: ['playerName', 'points', 'turnsTaken', 'pointsNeeded', 'isCurrentPlayer']
};
</script>

<style scoped>
  .current-player {
    background-color: yellow; /* Highlight background color for the current player */
    border-radius: 50%; /* Make a circular shape */
    padding: 10px; /* Adjust padding as needed */
  }
</style>

<template>
  <div>
    <h2>{{ playerName }}</h2>
    <p>Punten: {{ points }}</p>
    <p>Beurten: {{ turnsTaken }}</p>
  </div>
</template>

<script>
export default {
  props: ['playerName', 'points', 'turnsTaken']
};
</script>


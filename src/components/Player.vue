<template>
  <div>
    <h2>{{ playerName }}</h2>
    <p>Points: {{ points }}</p>
    <p>Turns Taken: {{ turnsTaken }}</p>
  </div>
</template>

<script>
export default {
  props: ['playerName', 'points', 'turnsTaken']
};
</script>


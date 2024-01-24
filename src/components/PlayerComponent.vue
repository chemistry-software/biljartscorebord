<template>
  <div>
    <h2>
      <span :class="{ 'current-player': isCurrentPlayer }" class="current-player-ball"></span>
      {{ playerName }} ({{ pointsNeeded }})
    </h2>
    <SegmentedDisplay :points="points" :n-digits="3" />
    <p>Moyenne: {{ (points / (turnsTaken || 1)).toFixed(3) }}</p>
  </div>
</template>

<script lang="ts">
import SegmentedDisplay from './SegmentedDisplay.vue';

export default {
  props: ['playerName', 'points', 'turnsTaken', 'pointsNeeded', 'isCurrentPlayer', 'started'],
  components: {
    SegmentedDisplay
  },
  data() {
    return {
      ballColor: this.started ? 'yellow' : 'white'
    }
  }
};
</script>

<style scoped>
.current-player-ball {
  display: none;
  background-color: v-bind(ballColor);
  border-radius: 50%;
  padding: 10px;
}

.current-player {
  display: inline-block;
}
</style>

<template>
  <div>
    <div class="players-container">
      <PlayerComponent
        v-for="(player, index) in players"
        :key="index"
        :playerName="player.name"
        :points="player.points"
        :turnsTaken="player.turnsTaken"
        :pointsNeeded="player.pointsNeeded"
        :isCurrentPlayer="index === currentPlayerIndex"
        :playerIdx="index"
      />
    </div>
    <div class="turns-container">
      <h1>Beurten: {{ players[0].turnsTaken || 1 }}</h1>
      <SegmentedDisplay />
    </div>
    <div class="button-container">
      <button @click="incrementPoints">+1</button>
      <button @click="decrementPoints">-1</button>
      <button @click="nextPlayer">Volgende speler</button>
    </div>
  </div>
  // eslint-disable-next-line vue/no-deprecated-html-element-is
  <button is='google-cast-button'></button>
</template>

<script lang="ts">
import PlayerComponent from './PlayerComponent.vue';
import SegmentedDisplay from './SegmentedDisplay.vue';

export default {
  name: 'ScoreboardComponent',
  components: {
    PlayerComponent,
    SegmentedDisplay
},
  data() {
    return {
      players: [
        { name: 'Player 1', points: 0, turnsTaken: 1, pointsNeeded: 30 }, /* turnsTaken is 1 because the first player always starts */
        { name: 'Player 2', points: 0, turnsTaken: 0, pointsNeeded: 42 }
      ],
      currentPlayerIndex: 0
    };
  },
  methods: {
    incrementPoints() {
      this.players[this.currentPlayerIndex].points += 1;
    },
    decrementPoints() {
      this.players[this.currentPlayerIndex].points -= 1;
    },
    nextPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.players[this.currentPlayerIndex].turnsTaken += 1;
    }
  }
};
</script>

<style>
.players-container {
  display: flex;
  justify-content: space-around;
  gap: 100px;
  margin-bottom: 50px;
}

.turns-container {
  text-align: center;
  margin-bottom: 50px;
}

.button-container {
  display: flex;
  justify-content: space-evenly;
}

.button-container button {
  font-size: 24px;
  padding: 10px 40px;
}
</style>


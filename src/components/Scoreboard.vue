<template>
  <div>
    <div class="players-container">
      <Player
        v-for="(player, index) in players"
        :key="index"
        :playerName="player.name"
        :points="player.points"
        :turnsTaken="player.turnsTaken"
      />
    </div>
    <div class="button-container">
      <button @click="incrementPoints">+1</button>
      <button @click="decrementPoints">-1</button>
      <button @click="nextPlayer">Next Player</button>
    </div>
  </div>
</template>

<script>
import Player from './Player.vue';

export default {
  components: {
    Player
  },
  data() {
    return {
      players: [
        { name: 'Player 1', points: 0, turnsTaken: 0 },
        { name: 'Player 2', points: 0, turnsTaken: 0 }
      ],
      currentPlayerIndex: 0 // Index of the current player in the players array
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
      this.players[this.currentPlayerIndex].turnsTaken += 1;
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  }
};
</script>

<style>
.players-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: space-around;
}
</style>


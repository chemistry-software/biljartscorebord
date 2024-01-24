<template>
  <div>
    <div class="config-container">
      <label for="player1Select">Select Player 1:</label>
      <select id="player1Select" v-model="player1Index">
        <option v-for="(player, index) in players" :key="index" :value="index">{{ player.name }}</option>
      </select>

      <label for="player2Select">Select Player 2:</label>
      <select id="player2Select" v-model="player2Index">
        <option v-for="(player, index) in players" :key="index" :value="index">{{ player.name }}</option>
      </select>
    </div>

    <div class="players-container">
      <PlayerComponent
        :playerName="players[player1Index]?.name"
        :points="players[player1Index]?.points"
        :turnsTaken="players[player1Index]?.turnsTaken"
        :pointsNeeded="players[player1Index]?.pointsNeeded"
        :isCurrentPlayer="currentPlayerIndex === player1Index"
        :playerIdx="player1Index"
      />
      <PlayerComponent
        :playerName="players[player2Index]?.name"
        :points="players[player2Index]?.points"
        :turnsTaken="players[player2Index]?.turnsTaken"
        :pointsNeeded="players[player2Index]?.pointsNeeded"
        :isCurrentPlayer="currentPlayerIndex === player2Index"
        :playerIdx="player2Index"
      />
    </div>

    <div class="turns-container">
      <h1>Beurten: {{ players[player1Index]?.turnsTaken || 1 }}</h1>
      <SegmentedDisplay :points="turn" :nDigits="2"/>
    </div>

    <div class="button-container">
      <button @click="incrementPoints(player1Index)">+1 Player 1</button>
      <button @click="decrementPoints(player1Index)">-1 Player 1</button>
      <button @click="nextPlayer">Volgende speler</button>
      <button @click="incrementPoints(player2Index)">+1 Player 2</button>
      <button @click="decrementPoints(player2Index)">-1 Player 2</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import PlayerComponent from './PlayerComponent.vue';
import SegmentedDisplay from './SegmentedDisplay.vue';

interface Player {
  name: string;
  points: number;
  turnsTaken: number;
  pointsNeeded: number;
}

let players = ref<Player[]>([]);
let currentPlayerIndex = ref(0);
let player1Index = ref(0);
let player2Index = ref(1); // Set the default for player 2

const selectedPlayer = computed(() => players.value[currentPlayerIndex.value]);

const loadPlayers = () => {
  players.value = [
    { name: 'Bob', points: 0, turnsTaken: 1, pointsNeeded: 30 },
    { name: 'Henk', points: 0, turnsTaken: 1, pointsNeeded: 45 },
    { name: 'Fred', points: 0, turnsTaken: 1, pointsNeeded: 69 },
    { name: 'Derp', points: 0, turnsTaken: 1, pointsNeeded: 12 }
  ];
};

onMounted(() => {
  loadPlayers();
});

const incrementPoints = (playerIndex: number) => {
  players.value[playerIndex].points += 1;
};

const decrementPoints = (playerIndex: number) => {
  players.value[playerIndex].points -= 1;
};

const nextPlayer = () => {
  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length;
  players.value[currentPlayerIndex.value].turnsTaken += 1;
};

const turn = computed(() => selectedPlayer?.value?.turnsTaken);
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


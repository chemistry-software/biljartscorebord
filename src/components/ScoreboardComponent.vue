<template>
  <div>
    <div class="config-container">
      <label for="playerSelect">Select Player:</label>
      <select id="playerSelect" v-model="currentPlayerIndex">
        <option v-for="(player, index) in players" :key="index" :value="index">{{ player.name }}</option>
      </select>
    </div>

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
      <h1>Beurten: {{ turn }}</h1>
      <!-- Assuming 'turn' is a computed property in your script -->
      <SegmentedDisplay :points="turn" :nDigits="2"/>
    </div>

    <div class="button-container">
      <button @click="incrementPoints">+1</button>
      <button @click="decrementPoints">-1</button>
      <button @click="nextPlayer">Volgende speler</button>
    </div>
  </div>
</template>


<!-- ScoreboardComponent.vue -->
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

const selectedPlayer = computed(() => players.value[currentPlayerIndex.value]);

const loadPlayers = () => {
  // Fetch players data from a JSON file or an API
  // For simplicity, I'll use a hardcoded JSON here
  players.value = [
    { name: 'Bob', points: 0, turnsTaken: 1, pointsNeeded: 30 },
    { name: 'Henk', points: 0, turnsTaken: 1, pointsNeeded: 45 },
    { name: 'Fred', points: 0, turnsTaken: 1, pointsNeeded: 69 },
    { name: 'Derp', points: 0, turnsTaken: 1, pointsNeeded: 12 }
  ];
};

onMounted(() => {
  // Load players from a JSON file or an API
  loadPlayers();
});

const incrementPoints = () => {
  selectedPlayer.value.points += 1;
};

const decrementPoints = () => {
  selectedPlayer.value.points -= 1;
};

const nextPlayer = () => {
  currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length;
  players.value[currentPlayerIndex.value].turnsTaken += 1;
};

const turn = 1; //computed(() => selectedPlayer.value.turnsTaken);
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


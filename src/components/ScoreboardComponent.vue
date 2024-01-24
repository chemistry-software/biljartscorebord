<template>
  <div>
    <div class="players-container">
      <PlayerComponent
        :playerName="players[player1Index]?.name"
        :points="players[player1Index]?.points"
        :turnsTaken="players[player1Index]?.turnsTaken"
        :pointsNeeded="players[player1Index]?.pointsNeeded"
        :isCurrentPlayer="currentPlayerIndex === player1Index"
        :started="true"
      />
      <PlayerComponent
        :playerName="players[player2Index]?.name"
        :points="players[player2Index]?.points"
        :turnsTaken="players[player2Index]?.turnsTaken"
        :pointsNeeded="players[player2Index]?.pointsNeeded"
        :isCurrentPlayer="currentPlayerIndex === player2Index"
        :started="false"
      />
    </div>

    <div class="turns-container">
      <h1>Beurten</h1>
      <SegmentedDisplay :points="turn" :nDigits="2"/>
    </div>

    <div class="button-container">
      <button @click="incrementPoints(player1Index)">+1 {{ players[player1Index]?.name }}</button>
      <button @click="decrementPoints(player1Index)">-1 {{ players[player1Index]?.name }}</button>
      <button @click="nextPlayer">Volgende speler</button>
      <button @click="incrementPoints(player2Index)">+1 {{ players[player2Index]?.name }}</button>
      <button @click="decrementPoints(player2Index)">-1 {{ players[player2Index]?.name }}</button>
    </div>

    <div class="config-container">
      <label for="player1Select">Speler 1:</label>
      <select id="player1Select" v-model="player1Index">
        <option v-for="(player, index) in players" :key="index" :value="index">{{ player.name }} ({{ player.pointsNeeded }})</option>
      </select>

      <label for="player2Select">Speler 2:</label>
      <select id="player2Select" v-model="player2Index">
        <option v-for="(player, index) in players" :key="index" :value="index">{{ player.name }} ({{ player.pointsNeeded }})</option>
      </select>
      <button @click="startNewGame">Nieuw spel</button>
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
let player1Index = ref(0);
let player2Index = ref(1); // Set the default for player 2
let currentPlayerIndex = ref(player1Index.value);

const nextPlayer = () => {
  // Player 1 always starts on a turn
  if(!players.value[player1Index.value].turnsTaken) {
    players.value[player1Index.value].turnsTaken = 1;
  }

  // Switch player and put new player on a new turn already, because that's how it goes in billiards
  currentPlayerIndex.value = currentPlayerIndex.value === player1Index.value ? player2Index.value : player1Index.value;
  players.value[currentPlayerIndex.value].turnsTaken += 1;
};

const turn = computed(() => players?.value[currentPlayerIndex.value]?.turnsTaken || 1);

const loadPlayers = () => {
  players.value = [
    { name: 'Anno', points: 0, turnsTaken: 0, pointsNeeded: 71 },
    { name: 'Ido', points: 0, turnsTaken: 0, pointsNeeded: 53 },
    { name: 'Bert', points: 0, turnsTaken: 0, pointsNeeded: 49 },
    { name: 'Geert', points: 0, turnsTaken: 0, pointsNeeded: 36 },
    { name: 'Gerrit', points: 0, turnsTaken: 0, pointsNeeded: 35 },
    { name: 'Erik', points: 0, turnsTaken: 0, pointsNeeded: 32 },
    { name: 'Piet', points: 0, turnsTaken: 0, pointsNeeded: 23 },
    { name: 'Brendon', points: 0, turnsTaken: 0, pointsNeeded: 20 },
    { name: 'Giel', points: 0, turnsTaken: 0, pointsNeeded: 18 },
    { name: 'Louis', points: 0, turnsTaken: 0, pointsNeeded: 16 },
    { name: 'Anjo', points: 0, turnsTaken: 0, pointsNeeded: 12 },
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

const startNewGame = () => {
  // Reset points, turnsTaken, and any other game-related state
  players.value.forEach((player) => {
    player.points = 0;
    player.turnsTaken = 0;
  });
  players.value[player1Index.value].turnsTaken = 1;
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
  margin: 10px;
}

.config-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.config-container label {
  margin-right: 10px;
}

.config-container select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>


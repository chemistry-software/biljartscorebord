<template>
  <div>
    <h2>Controls</h2>
    <button @click="incrementPoints(player1Index)">+1 {{ players[player1Index]?.firstName }}</button>
    <button @click="decrementPoints(player1Index)">-1 {{ players[player1Index]?.firstName }}</button>
    <button @click="nextPlayer">Next Player</button>
    <button @click="incrementPoints(player2Index)">+1 {{ players[player2Index]?.firstName }}</button>
    <button @click="decrementPoints(player2Index)">-1 {{ players[player2Index]?.firstName }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const players = ref([
  { firstName: 'Player 1', points: 0, turnsTaken: 0 },
  { firstName: 'Player 2', points: 0, turnsTaken: 0 }
]);

const player1Index = ref(0);
const player2Index = ref(1);

const incrementPoints = (playerIndex: number) => {
  players.value[playerIndex].points += 1;
  sendUpdateToAPI();
};

const decrementPoints = (playerIndex: number) => {
  if (players.value[playerIndex].points > 0) {
    players.value[playerIndex].points -= 1;
    sendUpdateToAPI();
  }
};

const nextPlayer = () => {
  const currentPlayerIndex = player1Index.value === 0 ? 1 : 0;
  players.value[currentPlayerIndex].turnsTaken += 1;
  sendUpdateToAPI();
};

const sendUpdateToAPI = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/updateGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player1Points: players.value[player1Index.value].points,
        player2Points: players.value[player2Index.value].points,
        turnsTaken: players.value[player1Index.value].turnsTaken + players.value[player2Index.value].turnsTaken
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update game');
    }
  } catch (error) {
    console.error('Error updating game:', error.message);
  }
};
</script>


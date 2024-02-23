<template>
  <div>
    <div class="players-container">
      <PlayerComponent
        :playerName="players[player1Index]?.firstName"
        :points="players[player1Index]?.points"
        :turnsTaken="players[player1Index]?.turnsTaken"
        :pointsNeeded="players[player1Index]?.pointsNeeded"
        :isCurrentPlayer="currentPlayerIndex === player1Index"
        :started="true"
      />
      <PlayerComponent
        :playerName="players[player2Index]?.firstName"
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
    <router-link to="/controls">Go to Controls</router-link>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

const players = ref([
  { firstName: 'Player 1', points: 0, turnsTaken: 0 },
  { firstName: 'Player 2', points: 0, turnsTaken: 0 }
]);

const player1Index = 0;
const player2Index = 1;

const updateScoreboard = (data: any) => {
  // Update scoreboard based on SSE data
  players.value[0].points = data.player1Points;
  players.value[1].points = data.player2Points;
  // You may need additional logic here to handle turnsTaken or other data
};

onMounted(() => {
  const eventSource = new EventSource('http://localhost:3000/api/sse');

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updateScoreboard(data);
  };

  eventSource.onerror = (error) => {
    console.error('EventSource error:', error);
    eventSource.close();
  };
});
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


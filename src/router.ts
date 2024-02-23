import { createRouter, createWebHistory } from 'vue-router';
import ScoreboardComponent from './components/ScoreboardComponent.vue';
import ControlsComponent from './components/ControlsComponent.vue';

const routes = [
  { path: '/', component: ScoreboardComponent },
  { path: '/controls', component: ControlsComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

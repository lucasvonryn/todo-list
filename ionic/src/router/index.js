import { createRouter, createWebHistory } from '@ionic/vue-router';
import Login from '../pages/Login.vue';
import Tasks from '../pages/Tasks.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/tasks', component: Tasks },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import Intro from '../views/Intro.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/blog/:id',
      name: 'UrlWithId',
      component: () => import('../components/BlogPost.vue'),
    },/*
    {
      path: '/blog/:slug',
      name: 'UrlWithSlug',
      component: () => import('../components/BlogPost.vue'),
    },*/
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/projects/:id',
      name: 'UrlId',
      component: () => import('../components/Project.vue'),
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro,
    },
  ],
});

export default router;
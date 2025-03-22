import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/element/index.scss';
import App from './App.vue';
import router from './router';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const app = createApp(App);

provideApolloClient(apolloClient);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
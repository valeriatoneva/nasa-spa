<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import { createApp } from 'vue';
import router from './router';

import NavigationBar from './components/NavigationBar.vue';

const app = createApp({
  components: {
    NavigationBar,
  },
});

app.use(router);

export default app.mount('#app');
</script>

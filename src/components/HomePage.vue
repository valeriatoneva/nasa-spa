<template>
  <div class="home-page">
    <navigation-bar></navigation-bar>
    <div class="content">
      <h1>Welcome to the NASA App!</h1>
      <p>Explore the wonders of the universe with the NASA App. Discover breathtaking images of space, access astronomy data, and more.</p>
      <p class="features">With the NASA App, you can:</p>
      <ul>
        <li>View the Astronomy Picture of the Day</li>
        <li>Explore Earth images from space</li>
        <li>Discover enhanced Earth images</li>
      </ul>
      <p>Start your cosmic journey now!</p>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  components: {
    NavigationBar
  }
};
</script>

<style scoped>
.home-page {
  background-color: #f2f2f2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  max-width: 800px;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

p {
  margin-bottom: 10px;
}

.features {
  font-weight: bold;
}

ul {
  text-align: left;
  margin-left: 30px;
}

li {
  margin-bottom: 5px;
}

.navigation-bar {
  margin-bottom: 20px;
}
</style>

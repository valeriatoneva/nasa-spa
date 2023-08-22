<template>
  <div class="navigation-bar">
    <router-link to="/">Home</router-link>
    <router-link to="/page1">Page 1</router-link>
    <router-link to="/page2">Page 2</router-link>
    <router-link to="/page3">Page 3</router-link>
    <router-link to="/favourites">Favourites</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

<style scoped>
.navigation-bar {
  background-color: #f2f2f2;
  padding: 10px;
  display: flex;
  justify-content: center;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

li {
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
}

a:hover {
  background-color: #e0e0e0;
}
</style>

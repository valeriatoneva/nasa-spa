<template>
  <div class="favourites">
    <h1>Favourite Pictures</h1>
    <div v-if="favoritePictures.length === 0">
      No favourite pictures saved.
    </div>
    <div v-else>
      <div v-for="picture in favoritePictures" :key="picture.date">
        <img :src="picture.url" :alt="picture.title" />
        <h2>{{ picture.title }}</h2>
        <p>{{ picture.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['favoritePictures']),
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

h2 {
  text-align: center;
}
</style>

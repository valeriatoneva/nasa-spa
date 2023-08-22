<template>
  <div class="page1">
    <h1>Astronomy Picture of the Day</h1>
    <div>
      <label for="date-picker">Select Date:</label>
      <input
        id="date-picker"
        type="date"
        v-model="selectedDate"
        @input="selectDate"
      />
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="apod && apod.url">
      <img :src="apod.url" :alt="apod.title" ref="apodImage" />
      <h2>{{ apod.title }}</h2>
      <p>{{ apod.explanation }}</p>
      <button @click="addToFavorites" :disabled="isSaved">Save{{ isSaved ? 'd' : '' }} as Favorite</button>
    </div>
    <div v-else-if="apod === null">
      No image available for the selected date.
    </div>
    <div v-else>
      Invalid date format.
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10),
      loading: false,
      apod: undefined,
      isSaved: false, 
    };
  },
  mounted() {
    this.fetchAPOD();
  },
  methods: {
    ...mapActions([
      'saveFavoritePicture'
    ]),
    ...mapGetters(['favoritePictures']),
    
    selectDate() {
      this.apod = undefined; 
      this.fetchAPOD(this.selectedDate);
    },
    
    async fetchAPOD(date) {
      this.loading = true;
      
      try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
          params: {
            date: date || this.selectedDate,
            api_key: 'HgOFqGyiZAY4ljrhckoo11GAWV1kt57O0PzbAdcJ',
          },
        });
        
        this.apod = response.data;
        this.$nextTick(() => {
          if (this.$refs.apodImage) {
            this.$refs.apodImage.scrollIntoView();
          }
        });
      } catch (error) {
        console.error('Error fetching APOD:', error);
        this.apod = null; 
      }
      
      this.loading = false;
    },
    
    addToFavorites() {
      this.saveFavoritePicture(this.apod);
      console.log('Favorite:', this.apod);
      this.isSaved = true; 
    },
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

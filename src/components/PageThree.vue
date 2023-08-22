<template>
  <div class="page-three">
    <h1 class="page-title">EPIC Enhanced Earth Image</h1>
    <div v-if="isLoading" class="loading-message">
      Loading...
    </div>
    <div v-else>
      <div class="date-picker">
        <label for="date-select">Select a date:</label>
        <select id="date-select" v-model="selectedDate" @change="fetchEPICEnhancedImages">
          <option v-for="date in availableDates" :value="date" :key="date">{{ formatDate(date) }}</option>
        </select>
      </div>
      <div class="image-container">
        <div v-for="image in images" :key="image.id" class="image-item">
          <img :src="image.url" :alt="image.caption" class="image" />
          <p class="caption">{{ image.caption }}</p>
        </div>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      errorMessage: '',
      availableDates: [],
      selectedDate: '',
      images: [],
    };
  },
  mounted() {
    this.fetchAvailableDates();
  },
  methods: {
    fetchAvailableDates() {
      const apiKey = 'HgOFqGyiZAY4ljrhckoo11GAWV1kt57O0PzbAdcJ'; 
      const apiUrl = `https://api.nasa.gov/EPIC/api/enhanced/available?api_key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.availableDates = data;
          this.selectedDate = this.availableDates[0];
          this.fetchEPICEnhancedImages();
        })
        .catch((error) => {
          console.error('Error fetching available dates:', error);
          this.errorMessage = 'Error fetching available dates';
          this.isLoading = false;
        });
    },
    fetchEPICEnhancedImages() {
      const apiKey = 'HgOFqGyiZAY4ljrhckoo11GAWV1kt57O0PzbAdcJ'; 
      const apiUrl = `https://api.nasa.gov/EPIC/api/enhanced/date/${this.selectedDate}?api_key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            this.images = data.map((image) => ({
              id: image.identifier,
              url: this.getEPICImageUrl(image),
              caption: image.caption,
            }));
          } else {
            throw new Error('No EPIC images available for the selected date');
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('Error fetching EPIC images:', error);
          this.errorMessage = error.message;
          this.isLoading = false;
        });
    },
    getEPICImageUrl(image) {
      const apiKey = 'HgOFqGyiZAY4ljrhckoo11GAWV1kt57O0PzbAdcJ'; 
      const date = image.date.slice(0, 10);
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      return `https://api.nasa.gov/EPIC/archive/enhanced/${year}/${month}/${day}/png/${image.image}.png?api_key=${apiKey}`;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toDateString();
    },
  },
};
</script>

<style scoped>
.page-three {
  text-align: center;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.date-picker {
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.image-item {
  margin: 10px;
}

.image {
  max-width: 100%;
  height: auto;
}

.caption {
  font-size: 14px;
}

.loading-message {
  margin-top: 100px;
  font-size: 18px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
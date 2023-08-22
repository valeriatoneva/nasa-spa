<template>
  <div>
    <h1>Earth Image</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="image-container" ref="imageContainer">
        <img :src="imageUrl" alt="Earth Image" ref="image" @error="handleImageError" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      isLoading: false,
      isZoomed: false,
      lastX: 0,
      lastY: 0,
      currentX: 0,
      currentY: 0,
      zoomScale: 1,
    };
  },
  mounted() {
    this.displayEarthImage();
  },
  methods: {
    async displayEarthImage() {
      try {
        this.isLoading = true;
        const response = await fetch(
          'https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=HgOFqGyiZAY4ljrhckoo11GAWV1kt57O0PzbAdcJ'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch image. Status: ' + response.status);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('image')) {
          throw new Error('Invalid response format. Expected image.');
        }
        const imageBlob = await response.blob();
        this.imageUrl = URL.createObjectURL(imageBlob);
        this.isLoading = false;

        this.$nextTick(() => {
          this.addEventListeners();
        });
      } catch (error) {
        console.error('Unable to fetch image.', error);
        this.imageUrl = null;
        this.isLoading = false;
      }
    },
    handleImageError() {
      console.error('Error occurred while loading image.');
      this.imageUrl = null;
    },
    addEventListeners() {
      const imageContainer = this.$refs.imageContainer;
      if (imageContainer) {
        imageContainer.addEventListener('mousedown', this.handleMouseDown);
        imageContainer.addEventListener('mousemove', this.handleMouseMove);
        imageContainer.addEventListener('mouseup', this.handleMouseUp);
        imageContainer.addEventListener('mouseleave', this.handleMouseLeave);
        imageContainer.addEventListener('wheel', this.handleMouseWheel);
      }
    },
    removeEventListeners() {
      const imageContainer = this.$refs.imageContainer;
      if (imageContainer) {
        imageContainer.removeEventListener('mousedown', this.handleMouseDown);
        imageContainer.removeEventListener('mousemove', this.handleMouseMove);
        imageContainer.removeEventListener('mouseup', this.handleMouseUp);
        imageContainer.removeEventListener('mouseleave', this.handleMouseLeave);
        imageContainer.removeEventListener('wheel', this.handleMouseWheel);
      }
    },
    handleMouseDown(event) {
      if (event.button === 0 && this.isZoomed) {
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.currentX = this.lastX;
        this.currentY = this.lastY;
        this.$refs.image.style.cursor = 'grabbing';
        this.$refs.imageContainer.style.userSelect = 'none';
      }
    },
    handleMouseMove(event) {
      if (this.isZoomed) {
        const deltaX = event.clientX - this.lastX;
        const deltaY = event.clientY - this.lastY;
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.currentX += deltaX;
        this.currentY += deltaY;
        this.$refs.image.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
      }
    },
    handleMouseUp(event) {
      if (event.button === 0 && this.isZoomed) {
        this.$refs.image.style.cursor = 'grab';
        this.$refs.imageContainer.style.userSelect = 'auto';
      }
    },
    handleMouseLeave() {
      this.$refs.image.style.cursor = 'grab';
      this.$refs.imageContainer.style.userSelect = 'auto';
    },
    handleMouseWheel(event) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const zoomDelta = -event.deltaY / 100;
        const zoomFactor = Math.exp(zoomDelta);
        const oldScale = this.zoomScale;
        this.zoomScale *= zoomFactor;
        this.zoomScale = Math.max(1, Math.min(this.zoomScale, 5));
        const scaleDelta = this.zoomScale - oldScale;
        this.currentX -= event.offsetX * scaleDelta;
        this.currentY -= event.offsetY * scaleDelta;
        this.$refs.image.style.transformOrigin = `${event.offsetX}px ${event.offsetY}px`;
        this.$refs.image.style.transform = `scale(${this.zoomScale}) translate(${this.currentX}px, ${this.currentY}px)`;
        this.isZoomed = true;
      } else {
        this.isZoomed = false;
      }
    },
  },
  beforeUnmount() {
    this.removeEventListeners();
  },
};
</script>

<style>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.image-container img {
  max-width: 100%; 
  height: auto;
}

.draggable {
  cursor: grab;
}
</style>
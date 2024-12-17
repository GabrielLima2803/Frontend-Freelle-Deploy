<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const videoOpacity = ref(1);
const isMobile = ref(false);

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleScroll = () => {
  if (!isMobile.value) {
    const scrollPosition = window.scrollY;
    videoOpacity.value = 1 - scrollPosition / 500; 
  }
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="video-section">
    <div class="parallax" :style="{ opacity: isMobile ? 1 : videoOpacity }">
      <video autoplay muted loop id="myVideo">
        <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/4152775255ab950937446041bfcf0a5a-1726568449715/HFW%20PT%20Subs%2016x9" type="video/mp4">
      </video>
    </div>
  </div>

  <div class="content">
    <div class="parallax" :style="{ opacity: 1 - videoOpacity }">
      <div class="overlay" :style="{ opacity: 1 - videoOpacity }">
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-section {
  position: relative;
  height: 500px;
}

.parallax {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

#myVideo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 20px;
}

.search-bar.mobile {
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.overlay {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-size: 24px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s, top 0.5s, transform 0.5s;
}

.overlay {
  margin: 0;
}
</style> 
<script setup>
import { ref, computed, onMounted } from 'vue';

const cards = [
  { title: 'Programação e Tecnologia', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png', bgColor: 'green-bg' },
  { title: 'Design Gráfico', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png', bgColor: 'orange-bg' },
  { title: 'Negócios', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png', bgColor: 'dark-green-bg' },
  { title: 'Consultoria', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png', bgColor: 'brown-bg' }
];

const currentIndex = ref(0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % cards.length;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + cards.length) % cards.length;
};

const isMediumScreen = computed(() => window.innerWidth > 768 && window.innerWidth <= 1500);
const isSmallScreen = computed(() => window.innerWidth <= 768);

const handleResize = () => {
  isMediumScreen.value = window.innerWidth > 768 && window.innerWidth <= 1500;
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
</script>

<template>
  <div class="card-section">
    <h2>Serviços Populares</h2>
    <div class="card-container">
      <div class="arrow left" @click="prev" v-if="isSmallScreen || isMediumScreen">‹</div>
      <div class="carousel" v-if="isSmallScreen || isMediumScreen">
        <div class="cards">
          <div v-for="(card, index) in (isMediumScreen ? cards.slice(currentIndex, currentIndex + 2) : cards.slice(currentIndex, currentIndex + 1))" :key="index" :class="'card ' + card.bgColor">
            <img :src="card.image" alt="card image" class="card-image" />
            <div class="card-content">
              <h3>{{ card.title }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="cards">
          <div v-for="(card, index) in cards" :key="index" :class="'card ' + card.bgColor">
            <img :src="card.image" alt="card image" class="card-image" />
            <div class="card-content">
              <h3>{{ card.title }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow right" @click="next" v-if="isSmallScreen || isMediumScreen">›</div>
    </div>
  </div>
</template>

<style scoped>
.card-section {
  text-align: left;
  margin: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden; 
  padding-top: 5px;
  padding-left: 60px; 
  padding-right: 60px; 
}

.cards {
  display: flex;
  gap: 20px; 
}

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  width: 320px; 
  height: 160px; 
  padding: 15px;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100px; 
  height: 100px; 
  border-radius: 8px;
  object-fit: contain;
  margin-right: 10px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0;
  font-size: 16px; 
  text-align: left;
  overflow-wrap: break-word;
}

.card:hover {
  transform: translateY(-5px);
}

.arrow {
  cursor: pointer;
  font-size: 30px;
  color: #333;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.left {
  left: 10px; 
}

.right {
  right: 10px; 
}

.green-bg {
  background-color: #1e7c1e;
}

.orange-bg {
  background-color: #ff7043;
}

.dark-green-bg {
  background-color: #004d40;
}

.brown-bg {
  background-color: #5d4037;
}

@media (max-width: 1500px) {
  .card {
    width: 280px; 
    height: 150px; 
  }

  .card-image {
    width: 80px; 
    height: 80px;
  }

  h3 {
    font-size: 14px; 
  }
}

@media (max-width: 768px) {
  .card {
    width: 240px; 
    height: 120px; 
  }

  .card-image {
    width: 60px; 
    height: 60px; 
  }

  h3 {
    font-size: 12px; 
  }
}
</style>


<script setup>
import { ref, computed, onMounted } from 'vue';

const cards = [
  { title: 'Desenvolvimento de Sites', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png', bgColor: 'green-bg' },
  { title: 'Logotipo', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png', bgColor: 'orange-bg' },
  { title: 'SEO', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png', bgColor: 'dark-green-bg' },
  { title: 'Arquitetura e Design de Interiores', image: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png', bgColor: 'brown-bg' }
];

const currentIndex = ref(0);
const totalCards = cards.length;

const isMediumScreen = ref(false);
const isSmallScreen = ref(false);

const updateScreenSize = () => {
  const width = window.innerWidth;
  isMediumScreen.value = width > 768 && width <= 1500;
  isSmallScreen.value = width <= 768;
};

const visibleCardsCount = computed(() => {
  if (isSmallScreen.value) return 1;
  if (isMediumScreen.value) return 2;
  return totalCards;
});

const progressWidth = computed(() => {
  const percentage = ((currentIndex.value + visibleCardsCount.value) / totalCards) * 100;
  return `${percentage}%`;
});

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % totalCards;
};

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + totalCards) % totalCards;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});
</script>



<template>
  <div class="card-section">
    <h2>Serviços Populares</h2>
    <div class="card-container">
      <div class="arrow left" @click="prev" v-if="isSmallScreen || isMediumScreen">‹</div>
      <div class="carousel">
        <div class="cards">
          <div 
            v-for="(card, index) in cards.slice(currentIndex, currentIndex + visibleCardsCount)" 
            :key="index" 
            :class="'card ' + card.bgColor"
          >
            <img :src="card.image" alt="card image" class="card-image" />
            <div class="card-content">
              <h3>{{ card.title }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow right" @click="next" v-if="isSmallScreen || isMediumScreen">›</div>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressWidth }"></div>
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
  color: transparent;
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

.progress-bar {
  width: 40%;
  height: 4px;
  background-color: #e0e0e0;
  margin: 20px auto; 
  position: relative;
  display: flex;
  justify-content: center;
}

.progress {
  height: 100%;
  background-color: #787878;
  transition: width 0.3s ease;
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

@media (min-width: 1500px) {
  .progress-bar{
    display: none;
  }
}
@media (max-width: 768px) {
  .card {
    width: 320px;
    height: 160px;
  }
}



</style>
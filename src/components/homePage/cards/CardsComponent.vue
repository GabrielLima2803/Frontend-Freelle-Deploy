<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useCategoriasStore } from '@/stores';
import PreLoader from '../../loading/PreLoader'; 

const categoriaStore = useCategoriasStore();
const categorias = computed(() => categoriaStore.categorias); 
const currentIndex = ref(0);
const isLoading = ref(true); 

const next = () => {
  if (categorias.value.length) {
    const step = isMediumScreen.value ? 6 : 3;
    currentIndex.value = (currentIndex.value + step) % categorias.value.length;
  }
};

const prev = () => {
  if (categorias.value.length) {
    const step = isMediumScreen.value ? 6 : 3;
    currentIndex.value = (currentIndex.value - step + categorias.value.length) % categorias.value.length;
  }
};

const isMediumScreen = ref(window.innerWidth > 768 && window.innerWidth <= 1500);
const isSmallScreen = ref(window.innerWidth <= 768);

const handleResize = () => {
  isMediumScreen.value = window.innerWidth > 768 && window.innerWidth <= 1500;
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  await categoriaStore.getAllCategorias(); 
  isLoading.value = false; 
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div>
    <PreLoader v-if="isLoading" /> 
    <div class="card-section" v-if="!isLoading && categorias && categorias.length"> 
      <div class="card-container">
        <div class="arrow left" @click="prev" v-if="isSmallScreen || isMediumScreen">‹</div>
        <div class="carousel" v-if="isSmallScreen || isMediumScreen">
          <div class="cards">
            <div 
              v-for="(card, index) in (isMediumScreen ? categorias.slice(currentIndex, currentIndex + 6) : categorias.slice(currentIndex, currentIndex + 3))" 
              :key="index" 
              class="card">
              <router-link v-if="card.nome === 'Design Gráfico'" :to="{ name: 'design' }" class="router-link">
                <div class="icon-title">
                  <i :class="card.icon" class="card-icon"></i>
                  <h3 class="card-title">{{ card.nome }}</h3>
                </div>
              </router-link>
              <div v-else class="icon-title">
                <i :class="card.icon" class="card-icon"></i>
                <h3 class="card-title">{{ card.nome }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="cards">
            <div 
              v-for="(card, index) in categorias" 
              :key="index" 
              class="card">
              <router-link v-if="card.title === 'Design Gráfico'" :to="{ name: 'design' }">
                <div class="icon-title">
                  <i :class="card.icon" class="card-icon"></i>
                  <h3 class="card-title">{{ card.nome }}</h3>
                </div>
              </router-link>
              <div v-else class="icon-title">
                <i :class="card.icon" class="card-icon"></i>
                <h3 class="card-title">{{ card.nome }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow right" @click="next" v-if="isSmallScreen || isMediumScreen">›</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-section {
  text-align: left;
  margin: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden; 
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 60px; 
  padding-right: 60px; 
}

.cards {
  display: flex;
  gap: 10px; 
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 120px; 
  height: 120px; 
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  padding: 10px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.icon-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
}

.card-icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.card-title {
  font-size: 12px;
  color: #333;
  margin: 0;
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
.router-link {
  color: black;
  text-decoration: none;
}

.router-link-active,
.router-link-exact-active {
  color: inherit;
  text-decoration: none;
}
</style>

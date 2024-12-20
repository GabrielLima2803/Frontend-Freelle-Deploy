<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router'; 
import { useCategoriasStore } from '@/stores'; 

const categoriaStore = useCategoriasStore();
const categorias = computed(() => categoriaStore.categorias);
const currentIndex = ref(0);

const route = useRoute();
const currentCategoriaId = computed(() => route.params.categoriaId); 

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

onMounted(() => {
  window.addEventListener('resize', handleResize);
  categoriaStore.getAllCategorias();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="card-section" v-if="categorias && categorias.length"> 
    <div class="card-container">
      <div class="arrow left" @click="prev" v-if="isSmallScreen || isMediumScreen">‹</div>
      <div class="carousel" v-if="isSmallScreen || isMediumScreen">
        <div class="cards">
          <div 
            v-for="(card, index) in (isMediumScreen ? categorias.slice(currentIndex, currentIndex + 6) : categorias.slice(currentIndex, currentIndex + 3))" 
            :key="index" 
            class="card"
            :class="{ 'active-card': currentCategoriaId === String(card.id) }"  
          >
            <router-link :to="{ name: 'categorias-projetos', params: { categoriaId: card.id } }" class="router-link">
              <div class="icon-title">
                <i :class="card.icon" class="card-icon"></i>
                <h3 class="card-title">{{ card.nome }}</h3>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="cards">
          <div 
            v-for="(card, index) in categorias" 
            :key="index" 
            class="card"
            :class="{ 'active-card': currentCategoriaId === String(card.id) }"  
          >
            <router-link :to="{ name: 'categorias-projetos', params: { categoriaId: card.id } }" class="router-link">
              <div class="icon-title">
                <i :class="card.icon" class="card-icon"></i>
                <h3 class="card-title">{{ card.nome }}</h3>
              </div>
            </router-link>
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

.card-container {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 60px;
  padding-right: 60px;
  max-width: 100%; 
  box-sizing: border-box; 
}

.cards {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap; 
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

.active-card {
  border: 1px solid #006b63;
  box-shadow: 0px 8px 16px rgba(0, 123, 255, 0.2); 
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
  font-size: 20px;
  padding-bottom: 5px;
  color: white;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: #006B63;
  border-radius: 50%;  
  width: 20px; 
  height: 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
}

.left {
  left: -30px; 
}

.right {
  right: 5px; 
}

.arrow:hover {
  background-color: #004D4A;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
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
@media (max-width: 1500px) {
  .left{
    left: 12px;
  }
  .right{
    right: 12px;
  }
}

@media (max-width: 768px) {
  .cards {
    gap: 10px; 
    justify-content: center; 
  }
  .card {
    flex-shrink: 0; 
    width: 110px; 
    height: 120px;
  }
}
</style>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const projects = ref([
  { id: 1, image: 'https://i.ibb.co/X2JJhWw/Rectangle-50.jpg', title: 'Cartões de Visita' },
  { id: 2, image: 'https://i.ibb.co/j6pFVj4/Rectangle-51.jpg', title: 'Convite' },
  { id: 3, image: 'https://i.ibb.co/jDLjTTc/Rectangle-52.jpg', title: 'Logo Birdleaf' },
  { id: 4, image: 'https://i.ibb.co/3RTrZv4/Rectangle-53.jpg', title: 'Logo Toptip' },
  { id: 5, image: 'https://i.ibb.co/5GspfLd/Rectangle-54.jpg', title: 'Logo Casa da Fazenda' },
  { id: 6, image: 'https://i.ibb.co/c3SdV4N/Rectangle-55.jpg', title: 'Cartão de Bebê' },
]);

const education = ref('IFC - Campus Araquari');
const isSmallScreen = ref(window.innerWidth <= 768);
const currentIndex = ref(0);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="portfolio">
    <section class="portfolio-section">
      <p class="section-title">Portfólio de projetos</p>
      <div v-if="isSmallScreen" class="carousel">
        <button @click="prevSlide" class="carousel-button">❮</button>
        <div class="carousel-slide">
          <img :src="projects[currentIndex].image" :alt="projects[currentIndex].title" />
        </div>
        <button @click="nextSlide" class="carousel-button">❯</button>
      </div>
      <div v-else class="portfolio-gallery">
        <div class="project-card" v-for="project in projects" :key="project.id">
          <img :src="project.image" :alt="project.title" />
        </div>
      </div>
    </section>

    <section class="education-section">
      <p class="section-title">Formação</p>
      <div class="education">
        <i class="mdi mdi-school"></i>
        <span>{{ education }}</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio {
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.portfolio-gallery {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.project-card {
  flex: 0 0 auto;
  width: 190px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.project-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

/* Carrossel para telas pequenas */
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 300px;
  margin: 0 10px;
}

.carousel-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  padding: 0 10px;
}

.carousel-slide img {
  width: 100%;
  height: auto;
  max-width: 300px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 8px;
}

/* Formação */
.education {
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #333;
}

.education i {
  margin-right: 8px;
  font-size: 24px;
  color: #333;
}

/* Responsivo - remover barra de rolagem */
@media (max-width: 768px) {
  .portfolio-gallery {
    display: none;
  }
  .carousel {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .carousel-slide {
    flex-shrink: 0;
    width: 100%;
  }
  .carousel-button {
    font-size: 30px;
  }
  .section-title {
    font-size: 16px;
  }
}
</style>

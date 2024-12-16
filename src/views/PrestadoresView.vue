<script setup>
import { FooterPrincipalComponent, HeaderComponent, FooterSmall, CardsPerfil, CardProjetos, CardJobPerfil } from "@/components";
import { ref, onMounted } from 'vue';
const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <header-component v-if="!isSmallScreen" />
  <div class="container">
    <CardsPerfil />
    <CardProjetos />
    <card-job-perfil/>
    <div class="footer">
  <footer-principal-component v-if="!isSmallScreen" />
  <footer-small v-if="isSmallScreen" />
</div>
</div>
</template>

<style scoped>
.container {
  max-width: 1460px;
  margin: 0 auto; 
  padding: 0 20px;
}
</style>

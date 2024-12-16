<script setup>
import { ContentMainJob, FooterPrincipalComponent, FooterSmall, HeaderLoggedPage } from "@/components";
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
    <HeaderLoggedPage class="header" />
    <div class="container">
    <ContentMainJob/>
    <div class="footer">
    <footer-principal-component v-if="!isSmallScreen" />
    <footer-small v-if="isSmallScreen" />
  </div>
  </div>  
 
</template>

<style scoped>
@media (max-width: 768px) {
}

@media (max-width: 576px) {
  .header{
    display: none;
  }
}

</style>
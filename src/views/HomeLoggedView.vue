<script setup>
import {HeaderLoggedPage, ContentLoggedPage, FooterSmall, FooterPrincipalComponent} from "@/components"
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
    <HeaderLoggedPage class="header"/>
    <ContentLoggedPage/>
    <footer-principal-component v-if="!isSmallScreen"/>
    <footer-small v-if="isSmallScreen" />
</template>

<style scoped>
</style>
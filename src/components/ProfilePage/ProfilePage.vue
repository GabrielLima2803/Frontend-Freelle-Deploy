<script setup>
import CardProjetosProfile from './cards/CardProjetosProfile.vue';
import CardsPerfilProfile from './cards/CardsPerfilProfile.vue';
</script>

<template>
    <div class="container">
        <CardsPerfilProfile/>
        <CardProjetosProfile/>
    </div>
</template>

<style scoped>
.container {
  max-width: 1460px; 
  margin: 0 auto; 
  padding: 0 20px; 
}
</style>
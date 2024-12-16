<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProjetosStore } from '@/stores/projeto'; 
import { CardJob, CardUser, CardsComponent } from '@/components';

const route = useRoute();
const categoriaId = ref(route.params.categoriaId);
const projetosStore = useProjetosStore();

const carregarProjetos = (categoriaId) => {
  projetosStore.getProjetosPorCategoria(categoriaId); 
  console.log(projetosStore.projetosPorCategoria);
}

onMounted(() => {
  carregarProjetos(categoriaId.value);
});

watch(() => route.params.categoriaId, (novoCategoriaId) => {
  categoriaId.value = novoCategoriaId;
  carregarProjetos(novoCategoriaId);  
});
</script>

<template>
  <CardsComponent class="margin-top" />
  <h1 class="title">Projetos</h1>
  <div class="flex">
    <CardUser/>
    <div class="cards-job">
      <div v-for="projeto in projetosStore.projetosPorCategoria" :key="projeto.id">
        <CardJob :projeto="projeto" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  gap: 1.4em;
}

h1 {
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}

.title {
  font-size: 3em;
  font-weight: bold;
}

.cards-job {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.margin-top {
  margin-top: 30px;
}
</style>

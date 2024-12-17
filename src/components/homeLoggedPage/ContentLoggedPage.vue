<script setup>
import { onMounted } from 'vue'
import { useProjetosStore } from '@/stores/projeto'
import { CardsComponent, CardJob, CardUser } from '@/components'

const projetosStore = useProjetosStore()

onMounted(() => {
  console.log("Projetos" , projetosStore.projetos)
  projetosStore.getAllProjetos()
})
</script>

<template>
    <div>
        <div class="box-img">
            <img src="https://i.ibb.co/VjXvs2b/box-logged.png" alt="">
        </div>
        <div class="cards">
            <CardsComponent/>
        </div>
        <div class="flex">
            <CardUser/>
            <div class="cards-job">
                <h1 class="title">Melhor Raking</h1>
                <div v-for="projeto in projetosStore.projetos.slice(0, 3)" :key="projeto.id">
                    <CardJob :projeto="projeto" />
                </div>
            </div>
        </div>
        <div class="card-section">
            <h2>Feitos no Freele</h2>
            <img src="https://i.ibb.co/phgw2Yc/feitos.png" alt="Feitos no Freelle" class="img-feito"/>
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
    font-size: 2em;
    font-weight: bold;
}

.cards {
    margin-top: 5em;
    margin-bottom: 6em;
}

.cards-job {
    display: flex;       
    flex-direction: column; 
    gap: 15px;           
}

.margin-top {
    margin-top: 30px;
}

.box-img {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5em;
    margin-top: 1.5em;
}

.box-img img {
    max-width: 100%;
    height: auto;
}

.card-section {
  text-align: left;
  margin: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.img-feito {
    width: 100%;
}

@media (max-width: 576px) {
  .box-img{
    width: 460px;
    height: 80px;
    margin-left: 10px;
  }
}

</style>

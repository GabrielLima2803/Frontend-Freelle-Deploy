<template>
    <div class="container">
        <div class="box-img">
            <img :src="provider.foto" alt="Imagem do Usuário">
        </div>
        <div class="bio">
            <p class="biografia">{{ provider.about }}</p>
        </div>
        <div class="box-rating">
            <p class="negrito">Avaliação</p>
            <div class="rating-row" v-for="star in ratings" :key="star.stars">
                <p>{{ star.stars }} estrelas</p>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: star.percentage + '%' }"></div>
                </div>
                <p class="rating-count">({{ star.count }} avaliações)</p>
            </div>
        </div>
        <div class="formation">
            <p class="negrito">Formação</p>
            <p>
                <span class="mdi mdi-school icon"></span> Pós-Graduação
            </p>
        </div>
    </div>
</template>


<script setup>
import { reactive, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user'; 

const provider = reactive({
  name: "",
  username: "",
  location: "",
  language: "",
  rating: 0.0,
  reviews: "",
  totalOrders: "",
  yearsInPlatform: 0,
  expertise: "",
  about: "",
  foto: "https://i.ibb.co/DbXfRCv/user-default.png",  
});

const ratings = reactive([
  { stars: 5, percentage: 80, count: 150 },
  { stars: 4, percentage: 50, count: 120 },
  { stars: 3, percentage: 30, count: 90 },
  { stars: 2, percentage: 10, count: 40 },
  { stars: 1, percentage: 5, count: 25 }
]);

const userStore = useUserStore();

onMounted(() => {
  const token = localStorage.getItem("authToken"); 
  if (token) {
    userStore.getMeUser(token); 
  }
});

watch(() => userStore.currentUser, (newUser) => {
  if (newUser) {
    provider.name = newUser.name;
    provider.username = newUser.username;
    provider.location = newUser.nacionalidade.nome || "Local não especificado";
    provider.language = newUser.linguagem_principal || "Idioma não especificado";
    provider.rating = 4.5; 
    provider.reviews = "14.0k";
    provider.totalOrders = "29.2"; 
    provider.yearsInPlatform = 3; 
    provider.expertise = newUser.especializacao || "Especialização não especificada";
    provider.about = newUser.biografia || "Sem biografia disponível";
    provider.foto = newUser.foto ? newUser.foto.url : provider.foto;
  }
});
</script>

<style scoped>
.container {
    width: 300px;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 100%;
    padding: 20px;
    background-color: #f9f9f9;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

.box-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
}
.box-img img {
    width: 75%;
    max-width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
}

.bio, .box-rating, .formation {
    margin: 15px 0;
}

.box-rating {
    width: 100%;
}

.rating-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0;
}

.progress-bar {
    flex: 1;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin: 0 8px;
}

.progress-fill {
    height: 100%;
    background-color: #000000;
    border-radius: 4px;
}

.negrito {
    font-weight: bold;
}

.rating-count {
    font-size: 12px;
    color: #666;
}

.biografia {
    text-align: center;
    font-size: 14px;
}

.formation .icon {
    margin-right: 5px;
    color: #666;
}

@media (max-width: 576px){
  .container{
    display: none;
  }
}
@media (max-width: 1500px) {
    .container{
        display: none;
    }
}
</style>

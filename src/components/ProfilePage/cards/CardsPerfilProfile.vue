<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user'; 

const userStore = useUserStore();

function calculateYearsSince(dateString) {
  const createdAt = new Date(dateString);
  const currentDate = new Date();
  const years = currentDate.getFullYear() - createdAt.getFullYear();
  const month = currentDate.getMonth() - createdAt.getMonth();
  if (month < 0 || (month === 0 && currentDate.getDate() < createdAt.getDate())) {
    return years - 1;
  }
  return years;
}

const provider = ref({
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
  foto: "",
});

onMounted(() => {
  const token = localStorage.getItem("authToken"); 

  userStore.getMeUser(token).then(() => {
    const user = userStore.currentUser;

    provider.value = {
      foto: user.foto.url || 'https://i.ibb.co/Qk43Z1V/icon-freelle-empresa.png',
      name: user.name || '',
      username: user.username || '',
      location: user.nacionalidade ? user.nacionalidade.nome : '', // Verifica se 'nacionalidade' existe
      city: user.nacionalidade ? user.nacionalidade.cidade : '',  // Verifica se 'nacionalidade' existe
      language: user.linguagem_principal || '',
      rating: 4.8,
      reviews: 120,
      totalOrders: user.total_pedidos || 0,
      yearsInPlatform: calculateYearsSince(user.created_at),
      expertise: user.especializacao || '',
      about: user.biografia || '',
      areaAtuacao: user.area_atuacao || 'Gastronomia',
    };
    
  });
});
</script>

<template>
  <div class="profile-container">
    <!-- Esquerda: Perfil e Detalhes -->
    <div class="profile-left">
      <div class="profile-header">
        <img :src="provider.foto" alt="Profile Image" class="profile-image" />
        <div class="profile-info">
          <h1>
            {{ provider.name }}
            <span class="username">{{ provider.username }}</span>
            <i class="mdi mdi-check-decagram verified-icon"></i>
          </h1>
          <p class="location">
            <i class="mdi mdi-map-marker"></i> {{ provider.location }}
          </p>
          <p class="location">
            <i class="mdi mdi-translate"></i> {{ provider.language }}
            <!-- Ícone de editar ao lado de 'language' -->
            <router-link to="/update-profile" class="reset">
              <i class="mdi mdi-pencil edit-icon"></i>
            </router-link>
          </p>
        </div>
      </div>

      <div class="profile-details">
        <div class="ratings">
          <div class="rating">
            <span>★★★★★</span> {{ provider.rating.toFixed(1) }}
            <span class="review-count">{{ provider.reviews }} avaliações</span>
          </div>
          <div class="divider"></div>
          <div class="orders">
            <span>{{ provider.totalOrders }}</span> <span class="detail-label">Total de Pedidos</span>
          </div>
          <div class="divider"></div>
          <div class="years">
            <span>{{ provider.yearsInPlatform }} anos</span> <span class="detail-label">Na Plataforma</span>
          </div>
        </div>

        <div class="expertise">
          <h3>Expert em:</h3>
          <p><i class="mdi mdi-palette"></i> {{ provider.areaAtuacao }}</p>
        </div>
      </div>
    </div>   
  </div>
</template>

<style scoped>
/* Estilos do componente (igual aos que você já fez) */
.profile-container {
  display: flex;
  flex-direction: row;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.profile-left {
  flex: 1;
  width: 100%;
}
.reset{
  text-decoration: none;
  color: #000;
  margin-left: 5px;
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-image {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.profile-info h1 {
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.username {
  color: #666;
  font-size: 16px;
  margin-left: 10px;
}

.verified-icon {
  color: #000;
  font-size: 18px;
  margin-left: 5px;
}

.location {
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.profile-details {
  margin-top: 20px;
}

.ratings {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 15px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.review-count {
  color: #666;
  font-size: 14px;
  margin-left: 5px;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: #ddd;
  margin: 0 15px;
}

.orders, .years {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-label {
  color: #666;
  font-size: 12px;
  margin-top: 3px;
}

.expertise {
  margin-top: 25px;
  font-size: 18px;
}

.expertise i {
  font-size: 20px;
  margin-right: 5px;
}

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
  margin-left: 20px;
}

.favorite-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
}

.favorite-btn:hover {
  color: #006B63;
}

.contact-btn {
  align-self: stretch;
  margin-top: 30px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.contact-btn i {
  font-size: 16px;
}

.contact-btn:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .profile-image {
    width: 100px;
    height: 100px;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .profile-info h1 {
    font-size: 20px;
    padding-left: 10px;
  }
  .contact-card {
    display: none;
  }

  .expertise h3 {
    font-size: 16px;
  }

  .location,
  .review-count,
  .detail-label {
    font-size: 14px;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useProjetosStore } from '@/stores'
const authStore = useAuthStore()
const projetoStore = useProjetosStore()
const router = useRouter()
const userStore = useUserStore()

const showMenu = ref(false)
const showModal = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const toggleModal = () => {
  showModal.value = !showModal.value
}

const logout = () => {
  authStore.LogoutUser()
  showMenu.value = false
  router.push('/')
}



const projetosCandidatados = ref([])

onMounted(async () => {
  const token = localStorage.getItem('authToken')

  if (token) {
    try {
      await userStore.getMeUser(token)
      console.log('Usuário carregado:', userStore.currentUser)

      await projetoStore.getProjetosCandidatados(token)
      projetosCandidatados.value = projetoStore.projetosCandidatados
      console.log('Projetos candidatados Component:', projetoStore.projetosCandidatados)
    } catch (error) {
      console.error('Erro ao carregar os dados:', error)
    }
  }
})
</script>

<template>
  <div class="header">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/home-logged" class="btn">
          <img src="https://i.ibb.co/1KNDQpw/Freelee-icon.png" alt="Logo" class="img" />
        </router-link>
      </div>

      <div class="header-right">
        <div class="solicitacoes" @click="toggleModal">
          <span class="mdi mdi-account-circle icon"></span>
          <span>Solicitações</span>
          <span class="badge">{{ projetoStore.projetosCandidatados.length }}</span>
        </div>

        <button class="btn">Português</button>

        <button @click="toggleMenu" class="user-avatar-button">
          <img :src="userStore.currentUser?.foto?.url || 'https://via.placeholder.com/40'" alt="User Avatar"
            class="user-avatar" />
        </button>

        <div v-if="showMenu" class="user-menu">
          <router-link to="/profile-page" class="reset-link">
            <p>Ver perfil</p>
          </router-link>
          <p @click="logout()">Sair</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal">
    <div class="modal-header">
      <button @click="toggleModal" class="close-button">&larr;</button>
      <span class="modal-title">Solicitações</span>
    </div>

    <ul class="modal-body">
      <li v-for="(solicitacao, index) in projetoStore.projetosCandidatados" :key="index" class="solicitacao-item">
        <img :src="solicitacao.foto?.url || 'https://via.placeholder.com/150'" alt="Avatar"
          class="solicitacao-avatar" />
        <div class="solicitacao-info">
          <p class="solicitacao-nome">{{ solicitacao.titulo }}</p>
          <p class="solicitacao-email">R$ {{ solicitacao.orcamento }}</p>
        </div>
        <button v-if="solicitacao.candidatos[0]?.status === 'Selecionado'" class="solicitacao-btn selecionado">
          Selecionado
        </button>

        <button v-else class="solicitacao-btn">
          {{ solicitacao.candidatos[1]?.status || 'Pendente' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: #006b63;
  padding: 0.5em 1em;
}

.header-container {
  width: 100%;
  max-width: 1460px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.3em;
  flex: 1;
}

.img {
  width: 63px;
  height: 60px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1em;
}

.btn {
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 12px;
}

.user-avatar-button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.user-menu {
  position: absolute;
  background-color: white;
  color: #006b63;
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  top: 60px;
  right: 8em;
  z-index: 10;
}

.user-menu p {
  cursor: pointer;
  margin: 0.5em 0;
  color: #000000;
}

.user-menu p:hover {
  color: #000000;
}

.reset-link {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.solicitacoes {
  display: flex;
  align-items: center;
  color: white;
  gap: 0.3em;
  cursor: pointer;
  position: relative;
}

.solicitacoes .badge {
  color: white;
  border: white 1px solid;
  border-radius: 19%;
  padding: 0.2px 0.3rem;
  font-size: 0.6em;
  position: absolute;
  top: -5px;
  right: -16px;
}

.modal {
  position: absolute;
  top: 82px;
  right: 0;
  height: 100%;
  width: 600px;
  background-color: #f8f9fa;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 999;
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 1.5em;
  background-color: #f8f9fa;
  color: #006b63;
}

.close-button {
  background: none;
  border: none;
  color: #006b63;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0.2em;
  margin-right: 0.5em;
}

.modal-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #006b63;
}


.modal-body {
  padding: 1em;
  overflow-y: auto;
}

.solicitacao-item {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1.5em;
  padding: 0.8em;
}

.solicitacao-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.solicitacao-info p {
  margin: 0;
}

.solicitacao-nome {
  font-weight: bold;
  font-size: 1.1em;
}

.solicitacao-email {
  color: gray;
  font-size: 0.9em;
}

.solicitacao-item {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 1em;
  margin-bottom: 1.5em;
  padding: 0.8em;
}

.solicitacao-btn {
  background-color: #006b63;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  margin: 0; 
}


@media (max-width: 576px) {
  .header {
    display: none;
  }
}
</style>

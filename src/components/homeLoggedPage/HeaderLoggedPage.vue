<template>
  <div class="header">
    <div class="header-container">
      <div class="header-left">
        <router-link to="/home-logged" class="btn">
          <img src="https://i.ibb.co/1KNDQpw/Freelee-icon.png" alt="Logo" class="img" />
        </router-link>
        </div>

      <div class="header-right">
        <button class="btn">Português</button>

        <button @click="toggleMenu" class="user-avatar-button">
          <img :src="userStore.currentUser?.foto?.url || 'https://via.placeholder.com/40'" alt="User Avatar" class="user-avatar" />
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
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const logout = () => {
  authStore.LogoutUser()
  showMenu.value = false
  router.push('/')
}

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  const token = localStorage.getItem("authToken")
  if (token) {
    userStore.getMeUser(token).then(() => {
      console.log("Usuário carregado:", userStore.currentUser)
    }).catch(error => {
      console.error("Erro ao carregar o usuário:", error)
    })
  }
})

const searchQuery = ref('')
</script>


<style scoped>
.header {
  width: 100%;
  background-color: #006b63;
  padding: 0.5em 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>

<script setup>
import { FooterComponent, HeaderComponent, FooterSmall } from "@/components";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const isSmallScreen = ref(false);
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

const login = async () => {
  try {
    await authStore.LoginUser({ value: username.value, password: password.value });
    router.push('/home-logged');
  } catch (error) {
    errorMessage.value = 'Falha no login. Verifique seu e-mail e senha.';
    console.error('Login failed', error);
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <header-component v-if="!isSmallScreen" />

  <div class="wrapContainer">
    <div class="containerPrincipal">
      <form @submit.prevent="login" class="wrapForm">
        <h4 class="TextLeft">Olá!</h4>
        <p class="FormPLeft">Para continuar, digite seu e-mail</p>

        <div class="input-container">
          <input
            type="text"
            id="username"
            class="inputForm"
            v-model="username"
          />
          <label for="username" :class="{'active': username !== ''}" class="labelForm">E-mail ou Username</label>
        </div>
        <div class="input-container">
          <input
            type="password"
            id="password"
            class="marginForm inputForm"
            v-model="password"
          />
          <label for="password" :class="{'active': password !== ''}" class="labelForm">Senha</label>
        </div>

        <button type="button" class="btnSenha">
          <router-link to="/recuperacao" class="btnSenha">Esqueci minha senha</router-link>
        </button>

        <hr class="custom-hr" />
        <button type="submit" class="btnLogin mt-3">Entrar</button>
        <router-link to="/cadastro">
          <button type="button" class="btnCriar mt-3">Criar Login</button>
        </router-link>
        <p class="mt-4 FormP Pf">Protegido por reCAPTCHA - Privacidade | Condições</p>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>

  <footer-component v-if="!isSmallScreen" class="footer" />
  <footer-small v-if="isSmallScreen" />
</template>

<style scoped>
body {
  background: #006B63;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Arial', sans-serif;
}

.wrapContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: #006B63;
}

.containerPrincipal {
  width: 760px;
  height: 560px;
  background-color: white;
  padding: 60px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}

.TextLeft {
  font-weight: bold;
  text-align: left;
}

.FormPLeft {
  text-align: left;
}

.input-container {
  position: relative;
  margin-top: 30px;
}

.inputForm {
  width: 100%;
  height: 60px;
  padding: 15px;
  border: 0.3px solid #006B63;
  outline: none;
  transition: all 0.3s;
}

.labelForm {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  transition: all 0.3s;
  pointer-events: none;
  font-size: 12px;
}

.btnLogin, .btnCriar {
  width: 100%;
  height: 45px;
  margin-top: 25px;
  font-size: 18px;
  font-weight: bold;
}

.btnLogin {
  background-color: #006B63;
  color: white;
  border: none;
}

.btnCriar {
  background-color: white;
  border: 0.5px solid #006B63;
  color: #006B63;
  transition: all 0.3s ease;
  margin-top: 25px;
}

.btnCriar:hover {
  background-color: #006B63;
  color: white;
}

.btnSenha {
  border: none;
  text-decoration: none;
  background-color: white;
  color: rgb(149, 146, 146);
  font-size: 15px;
  cursor: pointer;
  padding: 10px;
}

.btnSenha:hover {
  color: #006B63;
  transition: 0.7s;
}

.custom-hr {
  display: block; 
  border: none; 
  border-top: 1.5px solid #006B63; 
  margin: 1px auto;
  width: 35%; 
}

.Pf {
  font-size: 12px;
  margin-top: 30px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.footer{
  background-color: #006B63;
}

@media (max-width: 768px) {
  .containerPrincipal {
    width: 90%;
    padding: 20px;
    margin-top: 50px;
  }

  .btnLogin, .btnCriar {
    font-size: 16px;
    height: 40px;
  }
}

@media (max-width: 576px) {
  .containerPrincipal {
    width: 85%;
    padding: 15px;
    box-shadow: none;
  }

  .btnLogin, .btnCriar {
    height: 35px;
    font-size: 14px;
  }

  .wrapContainer {
    background: white;
    justify-content: flex-start;
  }
}
</style>

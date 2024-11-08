<script setup>
import { FooterComponent, HeaderComponent, HeaderSmall, FooterSmall } from "@/components";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; 

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const errorMessage = ref('');

const register = async () => {
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'As senhas não coincidem!';
    return;
  }

  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  try {
    await authStore.RegisterUser(userData);
    router.push('/login'); 
  } catch (error) {
    errorMessage.value = 'Erro ao registrar usuário. Tente novamente mais tarde.';
    console.error('Erro no registro:', error);
  }
};

const setLabelActive = (inputId) => {
  const input = document.getElementById(inputId);
  const label = input.nextElementSibling;
  if (input.value || input === document.activeElement) {
    label.classList.add('active');
  } else {
    label.classList.remove('active');
  }
};
</script>

<template>
  <header-component v-if="!isSmallScreen" />
  <header-small v-if="isSmallScreen" />

  <div class="wrapContainer">
    <img src="https://i.ibb.co/1KNDQpw/Freelee-icon.png" alt="Logo" class="logo-top" />

    <div class="containerPrincipal">
      <div class="FormBot">
        <form @submit.prevent="register" class="wrapForm">
          <h4 class="TextLeft">Olá!</h4>
          <p class="FormPLeft">Faça o seu cadastro por aqui!</p>

          <div class="input-container">
            <input type="text" id="username" v-model="username" class="inputForm" @focus="setLabelActive('username')" @blur="setLabelActive('username')" />
            <label for="username" class="labelForm">Digite seu nome...</label>
          </div>
          <div class="input-container">
            <input type="email" id="email" v-model="email" class="inputForm" @focus="setLabelActive('email')" @blur="setLabelActive('email')" />
            <label for="email" class="labelForm">Digite seu email...</label>
          </div>
          <div class="input-container">
            <input type="password" id="password" v-model="password" class="inputForm" @focus="setLabelActive('password')" @blur="setLabelActive('password')" />
            <label for="password" class="labelForm">Crie sua senha...</label>
          </div>
          <div class="input-container">
            <input type="password" id="password-confirm" v-model="passwordConfirm" class="inputForm" @focus="setLabelActive('password-confirm')" @blur="setLabelActive('password-confirm')" />
            <label for="password-confirm" class="labelForm">Confirme sua senha...</label>
          </div>

          <button type="submit" class="btnCriar">Criar conta</button>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p class="FormP Pf">Protegido por reCAPTCHA - Privacidade | Condições</p>
        </form>
      </div>
    </div>
  </div>

  <div class="footer">
    <footer-component v-if="!isSmallScreen" />
    <footer-small v-if="isSmallScreen" />
  </div>
</template>

<style scoped>
body {
  background: #006B63;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  min-height: 90vh;
  background: #006B63;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

.containerPrincipal {
  width: 440px;
  background-color: white;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo-top {
  width: 80px;
  margin-bottom: 20px;
}

.TextLeft,
.FormPLeft {
  text-align: left;
}

.input-container {
  position: relative;
  margin-top: 20px;
}

.inputForm {
  width: 100%;
  padding: 15px;
  border: 1px solid #006B63;
  outline: none;
  transition: all 0.3s;
}

.inputForm:focus + .labelForm,
.labelForm.active {
  top: -10px;
  font-size: 12px;
}

.labelForm {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  transition: all 0.3s;
  pointer-events: none;
}

.btnCriar {
  width: 100%;
  height: 45px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  background-color: white;
  border: 2px solid #006B63;
  color: #006B63;
  transition: all 0.3s ease;
}

.btnCriar:hover {
  background-color: #006B63;
  color: white;
}

.Pf {
  font-size: 12px;
  margin-top: 30px;
}

.footer {
  background: #006B63;
}

@media (max-width: 768px) {
  .containerPrincipal {
    width: 90%;
    padding: 20px;
  }

  .btnCriar {
    font-size: 16px;
    height: 40px;
  }

  .logo-top {
    width: 60px;
  }
}

@media (max-width: 576px) {
  .containerPrincipal {
    width: 80%;
    padding: 15px;
  }

  .inputForm {
    height: 40px;
    padding: 10px;
  }

  .btnCriar {
    height: 35px;
    font-size: 14px;
  }
}
</style>


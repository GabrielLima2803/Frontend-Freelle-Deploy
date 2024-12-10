<script setup>
import { HeaderComponent, HeaderSmall } from "@/components";
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';  
import { useRouter } from 'vue-router';

const router = useRouter();
const isSmallScreen = ref(false);
const resetData = ref({
  code: Array(6).fill(''),
  new_password: "",
  confirmPassword: "",
});

const authStore = useAuthStore();

// Verifica o tamanho da tela
const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// Função para mover o foco entre os campos de código
const moveFocus = (event, currentIndex) => {
  const inputs = document.querySelectorAll('.code-input');
  if (event.target.value !== "" && currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus();
  } else if (event.target.value === "" && currentIndex > 0) {
    inputs[currentIndex - 1].focus();
  }
};

// Função para redefinir a senha
const resetPassword = async () => {
  const codeString = resetData.value.code.join(''); 

  if (resetData.value.new_password !== resetData.value.confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  if (codeString.length !== 6) {
    alert("O código precisa ter 6 dígitos.");
    return;
  }

  try {

    await authStore.ResetPasswordUser({ 
      reset_code: codeString, 
      new_password: resetData.value.new_password 
    });
    router.push("/login")
    alert("Senha alterada com sucesso!");
  } catch (error) {
    alert("Erro ao resetar a senha. Tente novamente.");
  }
};
</script>

<template>
  <!-- Header Grande (escondido em telas pequenas) -->
  <header-component v-if="!isSmallScreen" />
  <!-- Header Pequeno (exibido apenas em telas pequenas) -->
  <header-small v-if="isSmallScreen" />

  <div class="wrapContainer">
    <div class="FormTop">
      <img src="https://i.ibb.co/1KNDQpw/Freelee-icon.png" alt="Logo" class="logo-top" />
    </div>
    <div class="containerPrincipal">
      <div class="FormBot">
        <form @submit.prevent="resetPassword" class="wrapForm">
          <h2 class="text">Digite o Código</h2>
          <div class="code-container mt-3">
            <input
              v-for="(input, index) in 6"
              :key="index"
              type="text"
              maxlength="1"
              class="code-input"
              v-model="resetData.code[index]"
              @input="moveFocus($event, index)"
            />
          </div>

          <div class="input-container">
            <input
              type="password"
              id="password"
              class="inputForm"
              v-model="resetData.new_password"
              required
            />
            <label for="password" class="labelForm">Crie sua nova senha...</label>
          </div>

          <div class="input-container">
            <input
              type="password"
              id="confirmPassword"
              class="marginForm inputForm"
              v-model="resetData.confirmPassword"
              required
            />
            <label for="confirmPassword" class="labelForm">Confirme sua nova senha...</label>
          </div>

          <button type="submit" class="btnAtualizar mt-3">Atualizar</button>
          <p class="mt-4 FormP Pf">Protegido por reCAPTCHA - Privacidade | Condições</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
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
  min-height: 100vh;
  background: #006B63;
}

.containerPrincipal {
  width: 640px;
  height: 740px;
  background-color: white;
  padding: 60px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}

.logo-top {
  width: 80px;
  margin-bottom: 20px;
}

.text{
  margin-top: 50px;
}

.input-container {
  position: relative;
  margin: 30px;
}

.inputForm {
  width: 100%;
  height: 60px;
  padding: 15px;
  border: 1px solid #006B63;
  outline: none;
  transition: all 0.3s;
}

.inputForm:focus + .labelForm,
.labelForm.active {
  top: -10px;
  font-size: 12px;
  color: #006B63;
}

.labelForm {
  position: absolute;
  top: 50%;
  left: 15px;
  font-size: 12px;
  transform: translateY(-50%);
  transition: all 0.3s;
  pointer-events: none;
  color: #666;
}

.btnAtualizar {
  background-color: #006B63;
  color: white;
  border: none;
  width: 89%;
  height: 45px;
  margin-top: 35px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.Pf {
  font-size: 12px;
  margin-top: 80px;
}

.code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
}

.code-input {
  width: 50px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #bebebe;
  outline: none;
}

.code-input:focus {
  border-color: #006B63;
}

.separator {
  font-size: 24px;
  font-weight: bold;
  color: #006B63;
}

@media (max-width: 768px) {
  .containerPrincipal {
    width: 90%;
    padding: 20px;
  }

  .btnLogin, .btnCriar {
    font-size: 16px;
    height: 40px;
  }

  .logo {
    width: 140px;
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

  .btnLogin, .btnCriar {
    height: 35px;
    font-size: 14px;
  }
}
</style>

<script setup>
import { HeaderComponent, FooterComponent, FooterSmall } from "@/components";
import { ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth";  
import { useRouter } from 'vue-router';

const isSmallScreen = ref(false);
const email = ref(""); 

const router = useRouter();
const authStore = useAuthStore();

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

const forgotPassword = async () => {
  try {
    await authStore.ForgotPasswordUser(email.value); 
    router.push("/validacao")
    alert("Código de recuperação enviado para seu email!");
  } catch (error) {
    alert("Erro ao enviar o código de recuperação. Tente novamente.");
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <header-component />

  <div class="wrapContainer">
    <div class="FormTop">
    </div>
    <div class="containerPrincipal">
      <div class="FormBot">
        <form @submit.prevent="forgotPassword" class="wrapForm">
          <h4 class="Text">Esqueci Minha Senha</h4>

          <div class="input-container">
            <input
              type="email"
              id="email"
              class="inputForm"
              v-model="email"
              required
            />
            <label for="email" class="labelForm" :class="{ 'active': email }">Digite seu email</label>
          </div>

          <button type="submit" class="btnCriar mt-3">Enviar Código</button>
          <p class="mt-4 FormP Pf">Protegido por reCAPTCHA - Privacidade | Condições</p>
        </form>
      </div>
    </div>
  </div>

  <footer-component v-if="!isSmallScreen" class="footer"/>
  <footer-small v-if="isSmallScreen" />
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 90vh;
  background: #006B63;
  padding-top: 150px;
}

.containerPrincipal {
  width: 740px;
  height: 400px;
  background-color: white;
  padding: 60px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}
.Text {
  font-size: 18px;
}

.input-container {
  position: relative;
  margin-top: 60px;
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
  transform: translateY(-50%);
  transition: all 0.3s;
  pointer-events: none;
  color: #666;
}

.btnCriar {
  width: 100%;
  height: 45px;
  margin-top: 60px;
  font-size: 16px;
  font-weight: bold;
  background-color: #006B63;
  border: none;
  color: white;
  transition: all 0.3s ease;
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

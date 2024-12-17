<script setup>
import { FooterComponent, HeaderComponent, HeaderSmall, FooterSmall } from "@/components";
import { ref, onMounted } from 'vue';

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <!-- Header Grande (escondido em telas pequenas) -->
  <header-component v-if="!isSmallScreen" />
  <!-- Header Pequeno (exibido apenas em telas pequenas) -->
  <header-small v-if="isSmallScreen" />

  <div class="wrapContainer">
    <div class="FormTop">
      <img src="https://i.ibb.co/1KNDQpw/Freelee-icon.png" alt="Logo" class="logo" />
    </div>
    <div class="containerPrincipal">
      <div class="FormBot">
        <form @submit.prevent="login" class="wrapForm">
          <!-- "Olá!" alinhado à esquerda -->
          <h4 class="Text">Digite o Código</h4>
          <!-- Texto "Para continuar, digite seu e-mail" alinhado à esquerda -->



            
          <div class="input-container">
            <input
              type="text"
              id="username"
              class="inputForm"
            />
            <label for="password" class="labelForm">Crie sua nova senha...</label>
          </div>
          <div class="input-container">
            <input
              type="password"
              id="password"
              class="marginForm inputForm"
            />
            <label for="password" class="labelForm">Confirme sua nova senha...</label>
          </div>

          
          <button type="submit" class="btnLogin mt-3">Atualizar</button>
         
          <p class="mt-4 FormP Pf">Protegido por reCAPTCHA - Privacidade | Condições</p>
        </form>
      </div>
    </div>
  </div>
<div class="footer">
  <!-- Footer Grande (escondido em telas pequenas) -->
  <footer-component v-if="!isSmallScreen" />
  <!-- Footer Pequeno (exibido apenas em telas pequenas) -->
  <footer-small v-if="isSmallScreen" />
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
  width: 440px;
  background-color: white;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center; /* Mantém o restante do formulário centralizado */
}

.logo {
  width: 160px;
}

.TextLeft {
  font-size: bold;
  text-align: left; /* Alinha o texto "Olá!" à esquerda */
}

.FormPLeft {
  text-align: left; /* Alinha o texto "Para continuar, digite seu e-mail" à esquerda */
}

.input-container {
  position: relative;
  margin-top: 30px;
}

.inputForm {
  width: 100%;
  height: 50px;
  padding: 15px;
  border: 1px solid #006B63;
  outline: none;
  transition: all 0.3s;
}

.inputForm:focus + .labelForm {
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

.labelForm.active {
  top: -10px;
  font-size: 12px;
}

.btnLogin, .btnCriar {
  width: 100%;
  height: 45px;
  margin-top: 15px;
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
  border: 2px solid #006B63;
  color: #006B63;
  transition: all 0.3s ease; /* Transição para o hover */
}

.btnCriar:hover {
  background-color: #006B63; /* Cor de fundo no hover */
  color: white; /* Cor do texto no hover */
}

.btnSenha {
  margin-top: 20px;
  border: none;
  border-bottom: solid 1px #006B63;
  background-color: white;
  color: gray;
  font-size: 15px;
  text-decoration: none;
}

.btnSenha:hover {
  color: #006B63;
  transition: 0.7s;
}

.Pf {
  font-size: 12px;
  margin-top: 30px;
}

.footer {
  background: #006B63;
}

/* Estilos para telas pequenas */
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
    width: 140px; /* Diminui mais o tamanho da logo em telas pequenas */
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

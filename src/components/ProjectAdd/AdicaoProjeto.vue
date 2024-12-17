<script setup>
import { HeaderComponent, FooterComponent, FooterSmall } from "@/components";
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
  <header-component/>

  <div class="wrapContainer">
    <div class="containerPrincipal">
      <p class="update-text">Precisa adicionar um projeto ao seu portifólio? <a href="#">Ir para os meus projetos</a></p>
      <hr class="divider">
      <div class="arrow-container">
        <span class="arrow">←</span>
      </div>
      <div class="project-form-container">
        <div class="project-image">
          <p>Adicionar Imagem +</p>
        </div>

        <form @submit.prevent="submitProject" class="wrapForm">
          <div class="input-container">
            <select id="category" class="inputForm">
              <option value="">Categoria</option>
              <option value="design">Design</option>
              <option value="desenvolvimento">Desenvolvimento</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <button type="submit" class="btn-submit">ADICIONAR PROJETO</button>
        </form>
      </div>

      <p class="privacy">Protegido por reCAPTCHA - <a href="#">Privacidade</a> | <a href="#">Condições</a></p>
    </div>
  </div>

  <div class="footer">
    <footer-component v-if="!isSmallScreen" />
    <footer-small v-if="isSmallScreen" />
  </div>
</template>

<style scoped>
body {
  background-color: #006B63;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.wrapContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #006B63;
  min-height: 100vh;
}

.containerPrincipal {
  width: 100%;
  max-width: 800px;
  background-color: white;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.update-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
}

.update-text a {
  color: #006B63;
  text-decoration: none;
  font-weight: bold;
}

.divider {
  margin: 10px 0;
  border: 0;
  border-top: 2px solid #ccc;
  width: 100%;
}

.arrow-container {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

.arrow {
  font-size: 24px;
  color: #006B63;
  cursor: pointer;
}

.project-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.project-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 1px dashed #ccc;
  color: #666;
  font-size: 14px;
}

.wrapForm {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.inputForm {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s;
}

.inputForm:focus {
  border-color: #006B63;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  background-color: #006B63;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #004D46;
}

.privacy {
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
}

.privacy a {
  color: #006B63;
  text-decoration: none;
}

.footer {
  background: #006B63;
  width: 100%;
}

@media (max-width: 576px) {
  .containerPrincipal {
    width: 85%;
    padding: 15px;
    box-shadow: none;
    margin-top: -50px;
  }

  .btnLogin, .btnCriar {
    height: 35px;
    font-size: 14px;
  }

  .wrapContainer {
    background: white;
    justify-content: center;
  }
}
</style>

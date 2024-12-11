<script setup>
import { HeaderComponent, HeaderSmall, FooterComponent, FooterSmall } from "@/components";
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
  <header-component v-if="!isSmallScreen" />
  <header-small v-if="isSmallScreen" />

  <div class="wrapContainer">
    <div class="containerPrincipal">
      <p class="update-text">Precisa criar um projeto? <a href="#">Ir para os meus projetos</a></p>
      <div class="project-form-container">
        <div class="project-image">
          <p>Imagem do projeto +</p>
        </div>

        <form @submit.prevent="submitProject" class="wrapForm">
          <div class="input-container">
            <label for="category">Categoria</label>
            <select id="category" class="inputForm">
              <option value="">Selecione a categoria...</option>
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.wrapContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #006B63;
}

.containerPrincipal {
  width: 80%;
  max-width: 1000px;
  background-color: white;
  padding: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
 
  align-items: center;
  text-align: center;
}

.update-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.update-text a {
  color: #006B63;
  text-decoration: none;
  font-weight: bold;
}

.project-form-container {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
}

.project-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 200px;
  border: 1px dashed #ccc;
  color: #666;
  font-size: 14px;
}

.wrapForm {
  width: 55%;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 15px;
}

.inputForm {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.3s;
  margin-top: 5px;
}

.inputForm:focus {
  border-color: #006B63;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  margin-top: 25px;
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
  background-color: #003F3A;
}

.privacy {
  font-size: 12px;
  color: #666;
  margin-top: 30px;
}

.privacy a {
  color: #006B63;
  text-decoration: none;
}

.footer {
  background: #006B63;
  width: 100%;
}

@media (max-width: 768px) {
  .containerPrincipal {
    width: 90%;
    padding: 20px;
  }

  .project-form-container {
    flex-direction: column;
    align-items: center;
  }

  .logo-top {
    width: 60px;
  }

  .btn-submit {
    font-size: 14px;
    padding: 12px;
  }
}
</style>

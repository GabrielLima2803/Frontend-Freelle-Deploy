<script setup>
import { HeaderLoggedPage, FooterComponent, FooterSmall } from "@/components";
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useNacionalidadeStore } from '@/stores/nacionalidade';
import { useFormacaoStore } from '@/stores/formacao';
import { useRouter } from "vue-router";

const isSmallScreen = ref(false);
const userStore = useUserStore();
const nacionalidadeStore = useNacionalidadeStore();
const formacaoStore = useFormacaoStore();
const router = useRouter()

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  nacionalidadeStore.getAllNacionalidades();
  formacaoStore.getAllFormacoes();
});

const userData = ref({
  name: '',
  email: '',
  biografia: '',
  especializacao: '',
  foto: '',
  formacao: null
});

const handleFileUpload = (event) => {
  const file = event.target.files[0]; 
  if (file) {
    userData.value.foto = file; 
  }
};

const updateProfile = async () => {
  try {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      alert('Token não encontrado! Faça login novamente.');
      return;
    }

    const formData = new FormData();
    formData.append('name', userData.value.name);
    formData.append('email', userData.value.email);
    formData.append('biografia', userData.value.biografia);
    formData.append('especializacao', userData.value.especializacao);
    formData.append('formacao', userData.value.formacao);

    if (userData.value.foto) {
      formData.append('foto', userData.value.foto);
    }

    await userStore.updateMeUser(authToken, formData);
    router.push("/home-logged")
    alert('Perfil atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar o perfil:', error);
    alert('Erro ao atualizar o perfil!');
  }
};

</script>

<template>
  <HeaderLoggedPage />
  <div class="wrapContainer">
    <div class="containerPrincipal">
      <p class="update-text">Precisa atualizar seu perfil? <a href="#">Vá para o meu perfil</a></p>
      <hr class="divider">
      <div class="arrow-container">
        <span class="arrow">←</span>
      </div>
      <div class="profile-form-container">
        <div class="profile-section">
          <img :src="userData.foto || 'default-avatar.png'" alt="Foto de perfil" class="profile-img" />
          <div class="input-container">
            <input type="file" id="foto" accept="image/*" @change="handleFileUpload" />
          </div>
          <img src="https://i.ibb.co/KxzTsLY/Group-174.png" alt="Editar" class="editar">
          <div>
            <textarea v-model="userData.biografia" placeholder="Conte um pouco da sua história..." class="biography-textarea"></textarea>
          </div>
        </div>

        <form @submit.prevent="updateProfile" class="wrapForm">
          <div class="input-container">
            <label for="name">Nome Completo</label>
            <input type="text" id="name" class="inputForm" v-model="userData.name" placeholder="Digite seu nome..." />
          </div>

          <div class="input-container">
            <label for="email">E-mail</label>
            <input type="email" id="email" class="inputForm" v-model="userData.email" placeholder="Digite seu email..." />
          </div>

          <div class="input-container">
            <label for="especializacao">Área de atuação </label>
            <input type="text" id="especializacao" class="inputForm" v-model="userData.especializacao" placeholder="Informe sua área de atuação...  " />
          </div>

          <div class="input-container">
            <label for="formacao">Formação</label>
            <input type="text" id="formacao" class="inputForm" v-model="userData.formacao" placeholder="Digite sua formação... " />
          </div>
        </form>
      </div>
      
                <button type="submit" class="btn-submit">CONFIRMAR ALTERAÇÕES</button>

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
  width: 1000px;
  background-color: white;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.update-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
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

.profile-form-container {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  margin-left: -90px;
  border: 2px solid #ccc;
}

.editar{
  width: 20px;
  margin-top: -60px;
  margin-left: 20px;
  cursor: pointer;
}

.story-text {
  font-size: 12px;
  color: #666;
}

.wrapForm {
  width: 65%;
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
  height: 55px;
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
  width: 920px;
  padding: 15px;
  margin: 25px auto;
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

.biography-textarea {
  width: 250px;
  height: 100px;
  padding: 12px;
  border: 1px solid #ccc;
  outline: none;
  margin-top: 45px;
  border-radius: 8px;
  transition: border-color 0.3s;
  box-shadow: 2px 2px #c4c4c4;
}

.biography-textarea:focus {
  border-color: #006B63;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #ccc;
}

.input-container input[type="file"] {
  display: none;
}

.input-container label {
  cursor: pointer;
  color: #006B63;
  font-weight: bold;
  margin-top: 10px;
}

.input-container input[type="file"]:focus + label {
  color: #003F3A;
}

@media (max-width: 576px) {
  .wrapContainer {
    background: white;
    justify-content: center;
  }

  .containerPrincipal {
    width: 100%;
    padding: 10px;
    margin-top: -20px;
    box-shadow: none;
    background-color: #fff;
  }

  .profile-form-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .profile-section {
    width: 100%;
    align-items: center;
  }

  .profile-img {
    width: 120px;
    height: 120px;
    margin: 0 auto 10px;
    margin-top: 20px;
  }

  .editar {
    margin-top: -70px;
    margin-left: 90px;
    width: 20px;
  }

  .biography-textarea {
    width: calc(100% - 20px);
    margin: 10px auto;
    width: 400px;
    margin-top: 40px;
  }

  .wrapForm {
    width: 100%;
  }

  .input-container {
    width: 100%;
    margin-bottom: 10px;
  }

  .inputForm {
    width: 100%;
    height: 55px;
  }

  .btn-submit {
    width: 100%;
    height: 50px;
    margin: 20px 0;
    padding: 10px;
    font-size: 14px;
  }

  .privacy {
    font-size: 10px;
    margin-top: 10px;
  }
  .update-text,
  .arrow-container,
  .divider {
    display: none;
  }
}

</style> 
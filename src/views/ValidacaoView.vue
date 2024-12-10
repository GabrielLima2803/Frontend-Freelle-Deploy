<script setup>
</script>

<template>
  <header-component v-if="!isSmallScreen" />
  <header-small v-if="isSmallScreen" />

  <div class="wrapContainer">
    <div class="FormTop">
      <img src="https://i.ibb.co/1KNDQpw/Freelee-icon.png" alt="Logo" class="logo-top" />
    </div>
    <div class="containerPrincipal">
      <div class="FormBot">
        <form @submit.prevent="login" class="wrapForm">
          <h4 class="Text">Digite o Código</h4>
          <div class="code-container mt-3">
            <input
              v-for="(input, index) in 3"
              :key="index"
              type="text"
              maxlength="1"
              class="code-input"
              @input="moveFocus($event, index)"
            />
            <!-- Traço separador -->
            <span class="separator">-</span>
            <!-- Segundo grupo de três inputs -->
            <input
              v-for="(input, index) in 3"
              :key="index + 3"
              type="text"
              maxlength="1"
              class="code-input"
              @input="moveFocus($event, index + 3)"
            />
          </div>

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

          <button type="submit" class="btnAtualizar mt-3">Atualizar</button>
          <p class="mt-4 FormP Pf">Protegido por reCAPTCHA - Privacidade | Condições</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
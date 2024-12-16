<script setup>
import { FooterSmall, CardServicos, CardsPrestadoresSmall, CardsFeitos, CardsComponent } from "@/components";
</script>

<template>
  <main>
    <CardServicos/>
    <CardsComponent/>
    <div class="card-container">
      <CardsPrestadoresSmall/>
    </div>
    <CardsFeitos/>
  </main>
  <FooterSmall/>
</template>

<style scoped>
html, body {
  width: 100%; 
  margin: 0; 
  padding: 0; 
}

#layout-small {
  display: flex;
  flex-direction: column;
  min-height: 100%; 
  width: 100%; 
}

main {
  margin-top: 5%;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 4rem;
  padding-top: 1.5rem;
  position: relative;
  box-sizing: border-box;
}

footer {
  border-top: #eeeeee 1px solid;
  box-shadow: 0 0 10px 0 #eeeeee;
  padding: 1.5rem;
  margin-top: auto;
  background-color: white;
  position: relative;
  width: 100%;
  color: white;
  text-align: center;
  z-index: 10;
}

.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 15px; 
  overflow: hidden;
  box-sizing: border-box; 
}

</style>
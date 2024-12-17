<script setup>
import {ProfilePage,HeaderLoggedPage, FooterPrincipalComponent, CardJobPerfil} from '@/components';
</script>

<template>
        <HeaderLoggedPage/>
        <ProfilePage/>
        <CardJobPerfil/>
        <footer-principal-component v-if="!isSmallScreen" />
        <footer-small v-if="isSmallScreen" />
</template>

<style scoped>



</style>
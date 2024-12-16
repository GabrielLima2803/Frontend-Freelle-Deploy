<script setup>
import {ProfilePage,HeaderLoggedPage, FooterPrincipalComponent} from '@/components';
</script>

<template>
        <HeaderLoggedPage/>
        <ProfilePage/>
        <footer-principal-component v-if="!isSmallScreen" />
        <footer-small v-if="isSmallScreen" />
</template>

<style scoped>



</style>
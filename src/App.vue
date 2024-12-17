<script setup>
import { useLoadingStore } from '@/stores/loading';
import { LoadingPage } from "@/components";

const loadingStore = useLoadingStore();
</script>

<template>
  <div>
    <LoadingPage v-if="loadingStore.isLoading" />

    <RouterView />
  </div>
</template>

<style scoped>
</style>

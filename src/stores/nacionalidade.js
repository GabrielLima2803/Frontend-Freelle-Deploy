import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import NacionalidadeService from '@/services/nacionalidade'
import { useLoadingStore } from '@/stores/loading'

export const useNacionalidadeStore = defineStore('nacionalidade', () => {
  const state = reactive({
    nacionalidades: []
  })

  const nacionalidades = computed(() => state.nacionalidades)
  const loadingStore = useLoadingStore()

  const getAllNacionalidades = async () => {
    loadingStore.startLoading()
    try {
      const data = await NacionalidadeService.getAllNacionalidades()
      state.nacionalidades = data
    } catch (error) {
      console.error('Erro ao buscar nacionalidades:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  return { nacionalidades, getAllNacionalidades }
})

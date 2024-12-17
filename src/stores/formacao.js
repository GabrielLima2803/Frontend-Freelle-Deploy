import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import FormacaoService from '@/services/formacao'
import { useLoadingStore } from '@/stores/loading'

export const useFormacaoStore = defineStore('formacao', () => {
  const state = reactive({
    formacoes: []
  })

  const formacoes = computed(() => state.formacoes)
  const loadingStore = useLoadingStore()

  const getAllFormacoes = async () => {
    loadingStore.startLoading()
    try {
      const data = await FormacaoService.getAllFormacoes()
      state.formacoes = data
    } catch (error) {
      console.error('Erro ao buscar formações:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  return { formacoes, getAllFormacoes }
})

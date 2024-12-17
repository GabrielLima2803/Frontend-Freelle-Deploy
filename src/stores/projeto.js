import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { ProjetoService } from '@/services'
import { useLoadingStore } from '@/stores/loading'

export const useProjetosStore = defineStore('projeto', () => {
  const state = reactive({
    projetos: [],
    projetosPorCategoria: [],  
    projetosCandidatados: [],
  })

  const projetos = computed(() => state.projetos)
  const projetosPorCategoria = computed(() => state.projetosPorCategoria)  
  const projetosCandidatados = computed(() => state.projetosCandidatados)
  const loadingStore = useLoadingStore()

  const getAllProjetos = async () => {
    loadingStore.startLoading()
    try {
      const data = await ProjetoService.getAllProjetos()
      state.projetos = data
    } catch (error) {
      console.error('Erro ao buscar projetos:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const createProjeto = async (projetoData) => {
    loadingStore.startLoading()
    try {
      const data = await ProjetoService.createProjeto(projetoData)
      state.projetos.push(data)
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const deleteProjeto = async (id) => {
    loadingStore.startLoading()
    try {
      await ProjetoService.deleteProjeto(id)
      state.projetos = state.projetos.filter((projeto) => projeto.id !== id)
    } catch (error) {
      console.error('Erro ao deletar projeto:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const updateProjeto = async (id, projetoData) => {
    loadingStore.startLoading()
    try {
      const updatedProjeto = await ProjetoService.updateProjeto(id, projetoData)
      const index = state.projetos.findIndex((projeto) => projeto.id === id)
      if (index !== -1) {
        state.projetos[index] = updatedProjeto
      }
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const getProjetosPorCategoria = async (categoriaId) => {
    loadingStore.startLoading();
    try {
      const data = await ProjetoService.getProjetosyCategoria(categoriaId);
      
      state.projetosPorCategoria = data;
    } catch (error) {
      console.error('Erro ao buscar projetos por categoria:', error);
    } finally {
      loadingStore.stopLoading();
    }
  }
  const getProjetosCandidatados = async (token) => {
    loadingStore.startLoading();
    try {
      const data = await ProjetoService.getProjetosCandidatados(token);
      console.log('Projetos candidatados Store:',  data)
      state.projetosCandidatados = data;
    } catch (error) {
      console.error('Erro ao buscar projetos por categoria:', error);
    } finally {
      loadingStore.stopLoading();
    }
  }
  

  return { 
    projetos, 
    projetosPorCategoria, 
    projetosCandidatados,
    getAllProjetos, 
    createProjeto, 
    deleteProjeto, 
    updateProjeto,
    getProjetosPorCategoria,  
    getProjetosCandidatados,
  }
})

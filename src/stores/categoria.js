import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { CategoriaService } from '@/services'
import { useLoadingStore } from '@/stores/loading'  

export const useCategoriasStore = defineStore('categoria', () => {
  const state = reactive({
    categorias: [],
  })

  const categorias = computed(() => state.categorias)
  
  const loadingStore = useLoadingStore()

  const getAllCategorias = async () => { 
    loadingStore.startLoading()  

    try {
      const data = await CategoriaService.getAllCategorias()
      console.log('Resposta da API:', data.results)
      state.categorias = data.results
      console.log('Categorias:', categorias.value)
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
    } finally {
      loadingStore.stopLoading()  
    }
  }

  const createCategoria = async (categoriaData) => { 
    loadingStore.startLoading()  

    try {
      const data = await CategoriaService.createCategoria(categoriaData)
      state.categorias.push(data)
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
    } finally {
      loadingStore.stopLoading() 
    }
  }

  const deleteCategoria = async (id) => { 
    loadingStore.startLoading()  

    try {
      await CategoriaService.deleteCategoria(id)
      state.categorias = state.categorias.filter((categoria) => categoria.id !== id) 
    } catch (error) {
      console.error('Erro ao deletar categoria:', error)
    } finally {
      loadingStore.stopLoading()
    }
  }

  const updateCategoria = async (id, categoriaData) => { 
    loadingStore.startLoading()  

    try {
      const updatedCategoria = await CategoriaService.updateCategoria(id, categoriaData)
      const index = state.categorias.findIndex((categoria) => categoria.id === id) 
      if (index !== -1) {
        state.categorias[index] = updatedCategoria
      }
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error)
    } finally {
      loadingStore.stopLoading()  
    }
  }

  return { categorias, getAllCategorias, createCategoria, deleteCategoria, updateCategoria } 
})

import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import ComentarioService from '@/services/ComentarioService';
import { useLoadingStore } from '@/stores/loading';

export const useComentarioStore = defineStore('comentario', () => {
  const state = reactive({
    comentarios: [],
  });

  const comentarios = computed(() => state.comentarios);
  const loadingStore = useLoadingStore();

  const getAllComentarios = async () => {
    loadingStore.startLoading();
    try {
      const data = await ComentarioService.getAllComentarios();
      state.comentarios = data.results;
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    } finally {
      loadingStore.stopLoading();
    }
  };

  const createComentario = async (comentarioData) => {
    loadingStore.startLoading();
    try {
      const newComentario = await ComentarioService.createComentario(comentarioData);
      state.comentarios.push(newComentario);
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
    } finally {
      loadingStore.stopLoading();
    }
  };

  const deleteComentario = async (id) => {
    loadingStore.startLoading();
    try {
      await ComentarioService.deleteComentario(id);
      state.comentarios = state.comentarios.filter((comentario) => comentario.id !== id);
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
    } finally {
      loadingStore.stopLoading();
    }
  };

  const updateComentario = async (id, comentarioData) => {
    loadingStore.startLoading();
    try {
      const updatedComentario = await ComentarioService.updateComentario(id, comentarioData);
      const index = state.comentarios.findIndex((comentario) => comentario.id === id);
      if (index !== -1) {
        state.comentarios[index] = updatedComentario;
      }
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
    } finally {
      loadingStore.stopLoading();
    }
  };

  return {
    comentarios,
    getAllComentarios,
    createComentario,
    deleteComentario,
    updateComentario,
  };
});

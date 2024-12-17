import axios from "axios";

class ComentarioService {
    async getAllComentarios() {
        const response = await axios.get('comentarios/');
        return response.data;
    }

    async deleteComentario(id) {
        const response = await axios.delete(`comentarios/${id}`);
        return response.data;
    }

    async createComentario(comentarioData) {
        const response = await axios.post('comentarios/', comentarioData);
        return response.data;
    }

    async updateComentario(id, comentarioData) {
        const response = await axios.put(`comentarios/${id}/`, comentarioData);
        return response.data;
    }
}

export default new ComentarioService();

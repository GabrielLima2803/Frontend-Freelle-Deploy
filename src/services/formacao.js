import axios from "axios";

class FormacaoService {
    async getAllFormacoes() {
        const response = await axios.get('formacao/')
        return response.data.results;
    }
}

export default new FormacaoService()

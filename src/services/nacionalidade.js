import axios from "axios";

class NacionalidadeService {
    async getAllNacionalidades() {
        const response = await axios.get('nacionalidades/')
        return response.data.results
    }
}

export default new NacionalidadeService()

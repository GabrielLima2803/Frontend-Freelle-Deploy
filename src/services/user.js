import axios from "axios";

class UserService {
    async getAllUsers() {
        try {
            const response = await axios.get('usuarios/');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            throw error;  
        }
    }

    async getMeUser(authToken) {
        try {
            const response = await axios.get('/usuarios/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar o usuário logado:", error);
            throw error;  
        }
    }

    async updateMeUser(authToken, userData) {
        try {
            const response = await axios.patch('/usuarios/update_me/', userData, {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log('Resposta da API:', response.data); 
            return response.data;
          } catch (error) {
            console.error('Erro na API:', error);
            throw error;
          }
        }

        async CandidatarVaga(projetoId, authToken) {
            try {
              const response = await axios.post(
                `/usuarios/${projetoId}/accept_vacancy/`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );
              return response.data;
            } catch (error) {
              console.error("Erro ao se candidatar à vaga:", error);
              throw error;
            }
          }
}

export default new UserService();

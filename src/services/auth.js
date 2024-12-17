import axios from "axios";

export default class AuthService {
    async RegisterUser(userData) {
        try {
            const response = await axios.post("/register/", userData);
            return response.data;
        } catch (error) {
            console.error('API request error:', error); 
            throw error;
        }
    }

    async LoginUser(credentials) {
        try {
            const response = await axios.post("/login/", credentials);
            return response.data;
        } catch (error) {
            console.error('API request error:', error); 
            throw error;
        }
    }

    async ForgotPasswordUser(email) {
        try {
            const response = await axios.post("/forgot-password/", { email });
            return response.data;
        } catch (error) {
            console.error('API request error:', error); 
            throw error;
        }
    }
    async ResetPasswordUser(reset_code, new_passoword) {
        try {
            const response = await axios.post("/reset-password/", reset_code, new_passoword);
            return response.data;
        } catch (error) {
            console.error('API request error:', error); 
            throw error;
        }
    }
}

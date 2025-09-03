import {defineStore} from 'pinia'
import api from '../api.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  actions: {

    async login(credentials: any) {
      try {
        const response = await api.post('api/login', credentials);
        console.log(response.data.token);
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.token = response.data.token;
        // await this.fetchUser();
        return response;
      } catch (error) {
        return error.response;
      }
    },

    async logout() {
      try {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        return response;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }finally {
        this.user = null  // clear state regardless
        this.token = null
      }
    },
  }
});

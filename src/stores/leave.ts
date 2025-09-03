import {defineStore} from 'pinia'
import api from '../api.js'

export const useApplyLeave = defineStore('applyLeave', {
  state: () => ({
    leave: [],
    appliedLeave: []
  }),
  actions: {
    async leaveType(id: number) {
      try {
        const response = await api.get(`api/leave-types`);
        this.leave = response.data;
        return response
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },



  }

});

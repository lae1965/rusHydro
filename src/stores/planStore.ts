import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

import type { IFullPlan, IPlan } from '../util/types'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plansList: <IPlan[]>[],
    curPlan: <IFullPlan>{},
    url: import.meta.env.VITE_SERVER_URL,
  }),

  getters: {
    getCurPlan(): IFullPlan {
      return this.curPlan
    },
  },

  actions: {
    async getPlanList() {
      try {
        const response = await axios.get(`${this.url}/plans/`)
        this.plansList = response.data
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    async getPlanById(id: number) {
      try {
        const response = await axios.get(`${this.url}/plans/${id}/`)
        this.curPlan = response.data
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    async createNewPlan(formData: FormData) {
      try {
        await axios.post(`${this.url}/plans/`, formData)
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
  },
})

import { defineStore } from 'pinia'

const store = {
  state: () => {
    return {
      ratesUSD: {},
      interestRates: ['USD', 'EUR', 'UAH'],
    }
  },
  actions: {
    setRates(rates) {
      this.ratesUSD = rates
    },
    addToInterestRates(interest) {
      this.interestRates.push(interest)
    },
    setInterestRates(rates) {
      this.interestRates = rates
    },
  },
  getters: {
    isMobile() {
      return window.innerWidth <= 640
    }
  },
}

const useMainStore = defineStore('main', store)

export default useMainStore
<template>
    <div v-if="notAddedCurrencies.length > 0" class="currency-rates__add-currency">
      <div class="add-currency__form">
        <label for="currency" class="add-currency__label">Валюта:</label>
          <Select :default="interest" @update:select="onInterestCurrencyChanged" :options="notAddedCurrencies"/>
          <Button @click="addToInterestRates">Добавить</Button>
      </div>
    </div>
    <div v-else class="currency-rates__add-currency">
      <p>Все валюты добавлены</p>
      <Button @click="resetInterestList">Сбросить добавленные</Button>
      <Button @click="emit('close')">Закрыть</Button>
    </div>
</template>

<script setup>
import { supportedCurrencies } from '@/logic/useRates.js'

const mainStore = useMainStore()

const interest = ref('')

const emit = defineEmits(['close', 'changeInterest'])

const notAddedCurrencies = computed(() => supportedCurrencies.filter(c => !mainStore.interestRates.includes(c)))

function onInterestCurrencyChanged(value) {
  interest.value = value
  emit('changeInterest', value)
}

function resetInterestList() {
  const defaultInterests = ['USD', 'EUR', 'UAH']
  mainStore.setInterestRates(defaultInterests)
  localStorage.setItem('interestRates', JSON.stringify(mainStore.interestRates))
}

function addToInterestRates() {
  mainStore.addToInterestRates(interest.value)
  localStorage.setItem('interestRates', JSON.stringify(mainStore.interestRates))
  emit('close')
}
</script>


<style lang="sass" scoped>

.currency-rates__add-currency
  background-color: #495057
  border-radius: 6px
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 1
  padding: 1em
  align-items: center
  justify-content: center
  display: flex
  flex-direction: column

  p
    margin-top: 0
    font-weight: 600
    margin-bottom: 10px

  button
    margin-top: 1em

.currency-rates__title
  font-size: 1.5rem
  margin-top: 0
  margin-bottom: 10px

.add-currency__form
  display: flex
  flex-direction: column
  width: 100%

.add-currency__label
  font-weight: bold
  margin-bottom: 5px

.add-currency__form > div
  margin-bottom: 1em

.add-currency__form > button
  margin-top: 1em






</style>
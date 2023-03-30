<template>
  <div class="currency-converter">

    <h2 class="currency-converter__title">Конвертер валют</h2>

    <form class="currency-converter__form">
      <label for="from" class="currency-converter__label">Исходная валюта:</label>

      <Select @update:select="fromCurrencyChanged" :default="fromCurrency" :options="currencies" />

      <label for="amount_from" class="currency-converter__label">Количество:</label>
      <input @focus="direction = 'from'" id="amount_from" type="number" v-model="fromAmount" min="0" step="0.01" class="currency-converter__input">

      <label for="to" class="currency-converter__label">Желаемая валюта:</label>

      <Select @update:select="toCurrencyChanged" :default="toCurrency" :options="currencies" />
      <label for="amount_to" class="currency-converter__label">Количество:</label>
      <input @focus="direction = 'to'" id="amount_to" type="number" v-model="toAmount" min="0" step="0.01" class="currency-converter__input">

      <p v-if="tooMuch" class="currency-converter__error">Сумма не должна превышать $10,000</p>
    </form>

    <h2 class="currency-rates__title">Текущие курсы валют</h2>

    <div class="currency-rates__wrapper">
      <label for="interest" class="currency-rates__label">Интересуемая валюта:</label>
      <Select @update:select="onTargretRateCurrencyChanged" :default="interest" :options="interestRates" />
    </div>

    <table class="currency-rates__table">
      <thead>
        <tr>
          <th class="currency-rates__header">Валюта</th>
          <th class="currency-rates__header">Курс</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currency, c) in currencies" :key="c" class="currency-rates__row">
          <td class="currency-rates__currency">{{ getCurrencyName(currency) }}</td>
          <td class="currency-rates__rate"><Number :number="getRate(currency)" /></td>
        </tr>
      </tbody>
    </table>

    <div class="currency-rates__buttons">
      <Button @click="showAddCurrencyForm" class="currency-rates__button">Добавить валюту</Button>
      <Button @click="updateExchangeRates" class="currency-rates__button">Обновить курсы</Button>
    </div>

    <Modal v-if="showAddCurrency" @close="showAddCurrency = false" @changeInterest="changeInterest" />
  </div>
</template>

<script setup>
import { updateExchangeRates, getCurrencyName } from '@/logic/useRates.js'

updateExchangeRates()

const mainStore = useMainStore()

const fromAmount = ref(0)
const toAmount = ref(0)

const direction = ref(null)

const fromCurrency = ref('USD')
const toCurrency = ref('BTC')

const interest = ref('USD')
const showAddCurrency = ref(false)

const interestRates = computed(() => mainStore.interestRates)

const ratesUSD = computed(() => mainStore.ratesUSD)

const currencies = computed(() => Object.keys(ratesUSD.value))

const tooMuch = computed(() => fromAmount.value > 10000)

watchEffect(() => {
  if (direction.value === 'from') {
    const fromRate = ratesUSD.value?.[fromCurrency.value]
    const toRate = ratesUSD.value?.[toCurrency.value]
    toAmount.value = fromAmount.value * (fromRate / toRate)
  } else {
    const toRate = ratesUSD.value?.[fromCurrency.value]
    const fromRate = ratesUSD.value?.[toCurrency.value]
    fromAmount.value = toAmount.value * (fromRate / toRate)
  }
})

function getRate(currency) {
  const rateForInterestToUsd = ratesUSD.value[interest.value].toFixed(4)
  const rateForInterestToCurrency = ratesUSD.value[currency].toFixed(4)
  return rateForInterestToCurrency / rateForInterestToUsd
}

function showAddCurrencyForm() {
  showAddCurrency.value = true
}

function changeInterest(value) {
  console.log('changeInterest', value)
  interest.value = value
}

function onTargretRateCurrencyChanged(value) {
  interest.value = value
}

function toCurrencyChanged(value) {
  toCurrency.value = value
}

function fromCurrencyChanged(value) {
  fromCurrency.value = value
}

onMounted(() => {
  setupInterests()
})

function setupInterests() {
  const defaultInterests = ['USD', 'EUR', 'UAH']

  const interestRatesFromLocalStorage = localStorage.getItem('interestRates')

  if (interestRatesFromLocalStorage) {
    try {
      const interestRates = JSON.parse(interestRatesFromLocalStorage)
      mainStore.setInterestRates(interestRates)
    } catch (e) {
      localStorage.removeItem('interestRates')
    }
  } else {
    mainStore.setInterestRates(defaultInterests)
  }
}
</script>

<style lang="sass" scoped>

.currency-converter
  background-color: #495057
  min-width: 360px
  min-height: 540px
  border: 1px solid $border
  display: flex
  flex-direction: column
  position: relative
  overflow: hidden
  padding: 15px
  border-radius: 16px
  margin-top: 20px
  margin-bottom: 20px

.currency-rates
  &__buttons
    display: flex
    justify-content: space-between
    gap: 10px

h2
  font-size: 1.5rem
  margin-top: 0
  margin-bottom: 10px

form
  display: flex
  flex-direction: column

label
  font-weight: bold
  margin-bottom: 5px

select, input[type="number"]
  padding: 10px
  margin-bottom: 10px
  border-radius: 5px
  border: 1px solid rgb(27, 34, 54)
  background-color: #D8D8D8

p
  margin-top: 0
  margin-bottom: 10px

  &.error
    color: red

table
  width: 100%
  border-collapse: collapse
  margin-bottom: 20px

thead
  font-weight: bold

th, td
  padding: 10px
  text-align: left
  border: 1px solid
  border-color: #868e96
  box-shadow: 0 0 3px 0 #868e96

form.add-currency
  margin-top: 20px

.currency-rates__wrapper
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 20px
  gap: 10px

.currency-rates__label
  font-weight: bold
  margin-bottom: 0

.currency-rates__table
  margin-bottom: 20px

.currency-rates__header
  font-weight: bold

.currency-rates__currency
  font-weight: bold

.currency-rates__rate
  font-weight: bold

.currency-rates__button
  width: 100%

.currency-rates__row
  &:nth-child(odd)
    background-color: #495057

.currency-converter__error
  color: $red
  font-weight: bold
  margin-bottom: 10px

.currency-converter__form
  & > *:not(:last-child)
    margin-bottom: 10px

</style>
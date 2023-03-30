import numeral from 'numeral'
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/main'

export const isDevelopment = process.env.NODE_ENV === 'development'

export function fmt(value) {
  return numeral(value).format('0,0.00')
}

export function require(path) {
  return new URL(`../assets/${path}`, import.meta.url).href
}

export { storeToRefs, useMainStore }
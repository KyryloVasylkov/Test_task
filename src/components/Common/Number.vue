<template>
  <span>{{ numberPart }}</span><span class="decimals">.{{ fractionalPart }}</span>
</template>

<script setup>
import { fmt } from '@/logic/functions.js'

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
})

const formatedNumber = computed(() => fmt(props.number).split('.'))
const numberPart = computed(() => formatedNumber.value[0])
const fractionalPart = computed(() => formatedNumber.value[1])
</script>

<style lang="sass" scoped>
.decimals
  font-size: 16px
  color: #adb5bd
</style>
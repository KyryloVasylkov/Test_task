<template>
  <button class="btn"><slot /></button>
</template>

<style lang="sass" scoped>
.btn
  width: 100%
  padding: 8px 0
  border-radius: 6px
  font-size: 16px
  font-weight: 600
  line-height: 19px
  color: #212529
  cursor: pointer
  background: $btn-primary
  text-align: center

  &:disabled
    opacity: 0.5
    cursor: not-allowed

  &:hover
    background-color: $btn-primary-hover
</style>
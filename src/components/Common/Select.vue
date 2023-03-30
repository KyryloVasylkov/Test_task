<template>
  <div class="custom-select">
    <div class="selected" :class="{ open: open }" @click="open = !open">{{ selected }}</div>
    <div class="items" :class="{ selectHide: !open }">
      <div v-for="(option, i) of options" :key="i" @click="onChange(option)">{{ option }} </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: false,
    default: null,
  }
})

const emit = defineEmits(['update:select'])

const open = ref(false)
const selected = ref(null)

function onChange(option) {
  emit('update:select', option)
  open.value = false
  selected.value = option
}

onMounted(() => {
  selected.value = props.default ? props.default : props.options.length > 0 ? props.options[0] : null
  emit('update:select', selected.value)
})
</script>

<style lang="sass" scoped>
.custom-select
  position: relative
  width: 100%
  text-align: left
  outline: none
  height: 47px
  line-height: 47px

  .selected
    background-color: #868e96
    border-radius: 6px
    border: 1px solid #666666
    color: #fff
    padding-left: 1em
    cursor: pointer
    user-select: none

    &.open
      border: 1px solid #868e96
      border-radius: 6px 6px 0px 0px

    &:after
      position: absolute
      content: ""
      top: 22px
      right: 1em
      width: 0
      height: 0
      border: 5px solid transparent
      border-color: #fff transparent transparent transparent

  .items
    color: #fff
    border-radius: 0px 0px 6px 6px
    overflow: hidden
    border-right: 1px solid #858e96
    border-left: 1px solid #858e96
    border-bottom: 1px solid #858e96
    position: absolute
    background-color: #adb5bd
    left: 0
    right: 0
    z-index: 1

    div
      color: #fff
      padding-left: 1em
      cursor: pointer
      user-select: none

      &:hover
        background-color: #858e96

.selectHide
  display: none

// show image in select
img
  width: 20px
  height: 20px
  margin-left: 240px
</style>

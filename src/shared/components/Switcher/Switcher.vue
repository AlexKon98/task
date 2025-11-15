<template>
  <label
    :for="id"
    class="cursor-pointer"
  >
    <input
      :id="id"
      class="hidden"
      type="checkbox"
      v-model="value"
    >
    <span 
      :class="[
        'relative block',
        'w-[42px] h-6',
        'rounded-full',
        'transition-colors duration-300',
        'after:absolute',
        'after:transition-all after:duration-300',
        'after:rounded-full after:bg-white',
        'after:shadow-profit',
        'after:top-[3px] after:left-[3px]',
        'after:w-[18px] after:h-[18px]',
        value
          ? 'bg-eastern-blue-600 after:translate-x-[18px]'
          : 'bg-base-500 after:translate-x-0'
      ]"
    />
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  id: string
}>()

const value = defineModel({
  required: true,
  default: false
})
</script>

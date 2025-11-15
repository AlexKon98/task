<template>
  <div
    :class="[
      'mt-3',
      'px-3 py-2',
      'text-red-500 bg-red-100',
      'font-medium text-xs leading-4',
      'border border-red-500',
    ]"
  >
    {{ store.errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { store } from '@/store';
</script>

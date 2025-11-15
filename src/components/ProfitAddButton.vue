<template>
  <button
    type="button"
    :class="[
      'flex items-center gap-2',
      'mt-3'
    ]"
    @click="store.addProfit"
  >
    <PlusIcon />

    <span
      class="font-medium text-xs leading-4 tracking-0 text-eastern-blue-600"
    >
      Add profit target {{ store.profits.length }}/5
    </span>
  </button>
</template>

<script lang="ts" setup>
import { store } from "@/store";
import PlusIcon from '@/shared/icons/PlusIcon/PlusIcon.vue';
</script>

<template>
  <div
    class="mt-4 flex gap-2 items-end"
  >
    <p
      class="font-normal text-sm leading-5 text-base-600"
    >
      Projected profit:
    </p>

    <div
      class="flex-1 border-b border-dashed border-base-500 mb-1"
    />

    <p
      class="font-medium text-sm leading-5 text-base-600"
    >
      <span class="text-base-950">{{ store.projectedProfit() }}</span> USDT
    </p>
  </div>
</template>

<script lang="ts" setup>
import { store } from '@/store';
</script>

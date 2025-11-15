<script setup lang="ts">
import PlaceOrderForm from "@/components/PlaceOrderForm.vue";
</script>

<template>
  <div class="h-full grid place-items-center">
    <div class="w-80 px-5 py-4 bg-white">
      <PlaceOrderForm/>
    </div>
  </div>
</template>

<style>
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
</style>

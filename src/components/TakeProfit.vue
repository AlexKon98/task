<template>
  <transition-group name="slide" tag="div" class="list"
    :class="[
      'w-full',
      'p-3',
      'bg-base-100'
    ]"
  >
    <div
      class="flex items-center justify-between"
    >
      <div
        class="flex items-center gap-2"
      >
        <InfoIcon
          class="size-[18px]"
        />

        <span
          class="font-medium text-base leading-6"
        >
          Take Profit
        </span>
      </div>

      <Switcher
        id="prodit-switcher"
        v-model="store.isProfitAdded"
      />
    </div>

    <ProfitTable
      v-if="store.isProfitAdded && store.profits.length"
    />

    <ErrorMessage 
      v-if="isErrorVisible"
    />

    <ProfitAddButton
      v-if="store.isProfitAdded && store.profits.length < 5"
    />

    <ProjectedProfit
      v-if="store.isProfitAdded"
    />
  </transition-group>
</template>

<script lang="ts" setup>
import { store } from "@/store";
import InfoIcon from "@/shared/icons/InfoIcon/InfoIcon.vue";
import Switcher from "@/shared/components/Switcher/Switcher.vue";
import ProfitTable from "./ProfitTable.vue";
import ProfitAddButton from "./ProfitAddButton.vue";
import ProjectedProfit from "./ProjectedProfit.vue";
import ErrorMessage from "./ErrorMessage.vue";
import { computed } from "vue";

const isErrorVisible = computed(() => {
  return store.isProfitAdded && store.profits.some(profit => profit.isError);
});
</script>

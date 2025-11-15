<template>
  <table>
    <thead>
      <tr class="text-base-600">
        <td class="font-medium text-xs leading-4 pl-0 pr-[25px] pt-4">
          Profit
        </td>

        <td class="font-medium text-xs leading-4 pl-0 pr-[50px] pt-4">
          Target price
        </td>

        <td class="font-medium text-xs leading-4 px-0 pt-4">
          Amount to sell
        </td>
      </tr>
    </thead>

    <transition-group name="slide" tag="tbody" class="list">
      <tr
        v-for="item in store.profits"
        :key="item.id"
        :class="[
          'border-b',
          item.isError ? 'border-red-400' : 'border-base-400'
        ]"
      >
        <td class="pt-3 pb-2">
          <label
            for="form-profit"
            :class="[
              'flex gap-2 font-medium text-sm leading-5',
              { 'text-red-600' : item.isError }
            ]"
          >
            <NumberInputForm
              v-model="item.profit"
              class="max-w-6"
              id="form-profit"
              name="form-profit"
              :style="{ width: inputLength(item.profit) + 'ch' }"
              @update:modelValue="value => store.updateProfit(item.id, value)"
            />

            <span :class="item.isError ? 'text-red-600' : 'text-base-600'">%</span>
          </label>
        </td>

        <td class="pt-3 pr-5 pb-2">
          <label
            for="form-price"
            :class="[
              'flex gap-1 font-medium text-sm leading-5',
              { 'text-red-600' : item.isError }
            ]"
          >
            <NumberInputForm
              v-model="item.price"
              class="max-w-[56px]"
              id="form-price"
              name="form-price"
              @update:modelValue="value => store.updatePrice(item.id, value)"
            />

            <span :class="item.isError ? 'text-red-600' : 'text-base-600'">USDT</span>
          </label>
        </td>

        <td class="relative pt-3 pb-2">
          <label
            for="form-amount"
            :class="[
              'flex gap-2 pr-6 font-medium text-sm leading-5',
              { 'text-red-600' : item.isError }
            ]"
          >
            <NumberInputForm
              v-model="item.amount"
              class="w-6"
              id="form-amount"
              name="form-amount"
              :style="{ width: inputLength(item.amount) + 'ch' }"
              @update:modelValue="value => store.updateAmount(item.id, value)"
            />

            <span :class="item.isError ? 'text-red-600' : 'text-base-600'">%</span>
          </label>

          <button
            type="button"
            class="absolute right-0 top-[calc(50%+4px)] -translate-y-1/2"
            @click="() => store.removeProfit(item.id)"
          >
            <CrossIcon />
          </button>
        </td>
      </tr>
    </transition-group>
  </table>
</template>

<script lang="ts" setup>
import { store } from "@/store";
import CrossIcon from "@/shared/icons/CrossIcon/CrossIcon.vue";
import NumberInputForm from "@/shared/components/NumberInput/NumberInputForm.vue";

const inputLength = (value: number) => {
  const length = String(value).length;
  return Math.min(Math.max(length, 1), 3);
};
</script>

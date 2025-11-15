import { reactive } from 'vue';
import { OrderSide, ProfitItem } from "@/model.ts";

export const store = reactive({
  activeOrderSide: 'buy' as OrderSide,
  price: 2,
  amount: 0,
  isProfitAdded: false,
  nextProfitId: 1,
  profits: [] as ProfitItem[],
  errorMessage: '',

  addProfit(): void {
    const last = this.profits[this.profits.length - 1];

    const newProfit = last ? last.profit + 2 : 2;

    const multiplier = newProfit / 100;

    const newPrice =
      this.activeOrderSide === 'buy'
        ? this.price * (1 + multiplier)
        : this.price * (1 - multiplier);

    const item: ProfitItem = {
      id: this.nextProfitId++,
      profit: newProfit,
      price: parseFloat(newPrice.toFixed(2)),
      amount: 20,
      isError: false,
    };

    this.profits.push(item);
  },

  removeProfit(id: number): void {
    this.profits = this.profits.filter((item) => item.id !== id);
  },

  projectedProfit(): number {
    const sum = this.profits.reduce((sum, item) => {
      const targetPrice = item.price;
      const targetAmount = item.amount;
      const formPrice = this.price;

      let value = 0;

      if (this.activeOrderSide === 'buy') {
        value = targetAmount * (targetPrice - formPrice);
      } else {
        value = targetAmount * (formPrice - targetPrice);
      }

      return sum + value;
    }, 0);

    return parseFloat(sum.toFixed(2));
  },

  calculatePrice(
    activeOrderSide: OrderSide,
    formPrice: number,
    profit: number,
  ) {
    return parseFloat(
      (activeOrderSide === 'buy'
        ? formPrice * (1 + profit / 100)
        : formPrice * (1 - profit / 100)
      ).toFixed(0),
    );
  },

  calculateProfit(
    activeOrderSide: OrderSide,
    formPrice: number,
    price: number,
  ) {
    return parseFloat(
      (activeOrderSide === 'buy'
        ? ((price - formPrice) / formPrice) * 100
        : ((formPrice - price) / formPrice) * 100
      ).toFixed(2),
    );
  },

  calculateAmount(value: number) {
    return parseFloat(value.toFixed(0));
  },

  updateProfit(id: number, newProfit: number) {
    const item = this.profits.find((p) => p.id === id);
    if (!item) return;

    item.profit = newProfit;
    item.price = this.calculatePrice(
      this.activeOrderSide,
      this.price,
      newProfit,
    );
  },

  updatePrice(id: number, newPrice: number) {
    const item = this.profits.find((p) => p.id === id);
    if (!item) return;

    item.price = newPrice;
    item.profit = this.calculateProfit(
      this.activeOrderSide,
      this.price,
      newPrice,
    );
  },

  updateAmount(id: number, newAmount: number) {
    const item = this.profits.find((p) => p.id === id);
    if (!item) return;

    item.amount = newAmount;
  },

  validateProfits(): boolean {
    let isValid = true;
    let totalProfit = 0;
    let totalAmount = 0;

    this.errorMessage = '';
    this.profits.forEach(p => p.isError = false);

    if (this.isProfitAdded && this.profits.length) {
      this.profits.forEach((p, index) => {
        if (p.profit < 0.01) {
          p.isError = true;
          this.errorMessage = 'Minimum value is 0.01%';
          isValid = false;
        }

        if (index > 0 && p.profit <= this.profits[index - 1].profit) {
          p.isError = true;
          this.profits[index - 1].isError = true;
          this.errorMessage = 'Each target\'s profit should be greater than the previous one';
          isValid = false;
        }

        if (p.price <= 0) {
          p.isError = true;
          this.errorMessage = 'Price must be greater than 0';
          isValid = false;
        }

        totalProfit += p.profit;
        totalAmount += p.amount;
      });

      if (totalProfit > 500) {
        this.profits.forEach(p => p.isError = true);
        this.errorMessage = 'Maximum profit sum is 500%';
        isValid = false;
      }

      if (totalAmount > 100) {
        this.profits.forEach(p => p.isError = true);
        const excess = totalAmount - 100;
        this.errorMessage = `${totalAmount} out of 100% selected. Please decrease by ${excess.toFixed(2)}`;
        isValid = false;
      }

      if (totalAmount < 100) {
        this.profits.forEach(p => p.isError = true);
        const deficit = 100 - totalAmount;
        this.errorMessage = `${totalAmount} out of 100% selected. Please increase by ${deficit.toFixed(2)}`;
        isValid = false;
      }
    }

    return isValid;
  },

  total(): number {
    return this.price * this.amount;
  },

  setOrderSide(side: OrderSide): void {
    this.activeOrderSide = side;
  },

  setPrice(price: number): void {
    this.price = price;
  },

  setAmount(amount: number): void {
    this.amount = amount;
  },

  setTotal(total: number): void {
    this.amount = this.price > 0 ? total / this.price : 0;
  },
});

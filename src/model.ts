export type OrderSide = "buy" | "sell";

export type ProfitItem = {
  id: number;
  profit: number;
  price: number;
  amount: number;
  isError: boolean;
};

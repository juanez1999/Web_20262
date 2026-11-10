export type OrderSummary = {
  id: number;
  item: string;
  quantity: number;
  status: "pending" | "ready";
};
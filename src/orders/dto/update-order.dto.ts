export class UpdateOrderDto {
  item?: string;
  quantity?: number;
  status?: "pending" | "ready";
}

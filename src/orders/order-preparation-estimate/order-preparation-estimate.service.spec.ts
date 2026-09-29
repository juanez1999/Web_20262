import { OrderEntity } from "../entities/order.entity";
import { describe, it, expect } from "@jest/globals";
import { OrderPreparationEstimateService } from "./order-preparation-estimate.service";

describe("OrderPreparationEstimateServiceTest", () => {
  const service = new OrderPreparationEstimateService();

  it("return order estimate in 0 because status is ready", () => {
    const orderMock = {
      quantity: 2,
      status: "ready",
      id: 1,
    } as OrderEntity;

    expect(service.estimate(orderMock)).toStrictEqual({
      estimatedMinutes: 0,
      orderId: 1,
      status: "ready",
    });
  });

  it("return order estimate in 7 because status is not ready and quantity is 2", () => {
    const orderMock = {
      quantity: 2,
      status: "pending",
      id: 1,
    } as OrderEntity;

    expect(service.estimate(orderMock)).toStrictEqual({
      estimatedMinutes: 7,
      orderId: 1,
      status: "pending",
    });
  });
});

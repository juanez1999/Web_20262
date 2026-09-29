import { OrderEntity } from "../entities/order.entity";
import { OrderRulesService } from "./order-rules.service";
import { describe, it, expect } from "@jest/globals";

describe("OrderRulesServiceTest", () => {
  const service = new OrderRulesService();

  it("allows a pending order with a positive quantity", () => {
    const orderMock = {
      quantity: 2,
      status: "pending",
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(orderMock)).not.toThrow();
  });

  it("rejects an order that is already ready", () => {
    const orderMock = {
      quantity: 2,
      status: "ready",
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(orderMock)).toThrow();
  });
});

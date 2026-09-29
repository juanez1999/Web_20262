import { describe, jest, beforeEach, it, expect } from "@jest/globals";
import { OrdersService } from "./orders.service";
import { OrderEntity } from "./entities/order.entity";
import { Test } from "@nestjs/testing";
import { CustomerEntity } from "./entities/customer.entity";
import { OrderRulesService } from "./order-rules/order-rules.service";
import { OrderPreparationEstimateService } from "./order-preparation-estimate/order-preparation-estimate.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

describe("OrdersServiceTest", () => {
  let service: OrdersService;

  const repositoryMock = {
    find: jest.fn(),
    findOne: jest.fn<(options: any) => Promise<OrderEntity | null>>(),
    create: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
  };

  const customerRepositoryMock = {
    findOneBy: jest.fn(),
  };

  const orderRulesServiceMock = {
    ensureCanBeMarkedAsReady: jest.fn(),
  };

  const orderPreparationEstimateServiceMock = {
    estimate: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: repositoryMock,
        },
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: customerRepositoryMock,
        },
        {
          provide: OrderRulesService,
          useValue: orderRulesServiceMock,
        },
        {
          provide: OrderPreparationEstimateService,
          useValue: orderPreparationEstimateServiceMock,
        },
      ],
    }).compile();

    service = moduleRef.get(OrdersService);
  });

  it("returns an order when the id exists", async () => {
    //Arrange
    const orderMock = {
      id: 7,
      item: "Cappuccino",
      quantity: 2,
      status: "pending",
      customer: {
        id: 3,
        name: "Laura",
        email: "laura@example.com",
      },
    } as OrderEntity;

    repositoryMock.findOne.mockResolvedValue(orderMock);

    // Act
    const result = await service.findOne(7);

    //Assert
    expect(result).toEqual(orderMock);
    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: 7 },
      relations: { customer: true },
    });
  });

  it("throws NotFoundException when the order does not exist", async () => {
    //Arrange
    repositoryMock.findOne.mockResolvedValue(null);

    //Act and assert
    await expect(service.findOne(7)).rejects.toBeInstanceOf(NotFoundException);
  });
});

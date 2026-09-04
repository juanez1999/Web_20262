"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
let OrdersService = class OrdersService {
    ordersRepository;
    customersRepository;
    constructor(ordersRepository, customersRepository) {
        this.ordersRepository = ordersRepository;
        this.customersRepository = customersRepository;
    }
    async create(createOrderDto) {
        const customer = await this.customersRepository.findOneBy({
            id: createOrderDto.customerId,
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with id ${createOrderDto.customerId} was not found`);
        }
        const order = this.ordersRepository.create({
            item: createOrderDto.item,
            quantity: createOrderDto.quantity,
            status: "pending",
            customer,
        });
        return this.ordersRepository.save(order);
    }
    async findAll() {
        return this.ordersRepository.find({
            relations: {
                customer: true,
            },
            order: {
                id: "ASC",
            },
        });
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                customer: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} was not found`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        this.ordersRepository.merge(order, updateOrderDto);
        return this.ordersRepository.save(order);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
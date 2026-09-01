"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
let OrdersService = class OrdersService {
    orders = [
        { id: 1, customer: 'Laura', item: 'Café latte', status: 'pending' },
        { id: 2, customer: 'Mateo', item: 'Sándwich', status: 'ready' },
    ];
    findAll(status) {
        if (!status) {
            return this.orders;
        }
        return this.orders.filter((order) => order.status === status);
    }
    findOne(id) {
        const order = this.orders.find((currentOrder) => currentOrder.id === id);
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} was not found`);
        }
        return order;
    }
    create(createOrderDto) {
        const newOrder = {
            id: this.orders.length + 1,
            customer: createOrderDto.customer,
            item: createOrderDto.item,
            status: 'pending',
        };
        this.orders.push(newOrder);
        return newOrder;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)()
], OrdersService);
//# sourceMappingURL=orders.service.js.map
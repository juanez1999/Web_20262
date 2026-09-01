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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiningEntity = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let DiningEntity = class DiningEntity {
    id;
    number;
    capacity;
    orders;
};
exports.DiningEntity = DiningEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DiningEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DiningEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 4 }),
    __metadata("design:type", Number)
], DiningEntity.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.dining),
    __metadata("design:type", Array)
], DiningEntity.prototype, "orders", void 0);
exports.DiningEntity = DiningEntity = __decorate([
    (0, typeorm_1.Entity)('dining')
], DiningEntity);
//# sourceMappingURL=dining.entity.js.map
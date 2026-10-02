import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentEntity } from './entities/shipment.entity';
import { ShipmentRulesService } from './shipment-rules.service';
import { ShipmentStatus } from './shipment-status.enum';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(ShipmentEntity)
    private readonly shipmentsRepository: Repository<ShipmentEntity>,
    private readonly shipmentRulesService: ShipmentRulesService,
  ) {}

  getAllShipments(): Promise<ShipmentEntity[]> {
    return this.shipmentsRepository.find();
  }

  async getOneShipment(id: number): Promise<ShipmentEntity> {
    const shipment = await this.shipmentsRepository.findOneBy({ id });

    if (!shipment) {
      throw new NotFoundException(`Shipment ${id} not found`);
    }

    return shipment;
  }

  async createShipment(data: CreateShipmentDto): Promise<ShipmentEntity> {
    const shipment = this.shipmentsRepository.create({
      ...data,
      status: ShipmentStatus.CREATED,
    });

    return this.shipmentsRepository.save(shipment);
  }

  async dispatchShipment(id: number): Promise<ShipmentEntity> {
    const shipment = await this.getOneShipment(id);

    this.shipmentRulesService.ensureCanBeDispatched(shipment);
    shipment.status = ShipmentStatus.DISPATCHED;

    return this.shipmentsRepository.save(shipment);
  }
}

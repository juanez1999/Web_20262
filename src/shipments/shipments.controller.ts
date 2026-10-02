import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentsService } from './shipments.service';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: CreateShipmentDto) {
    return this.shipmentsService.create(data);
  }

  @Patch(':id/dispatch')
  dispatch(@Param('id') id: string) {
    return this.shipmentsService.dispatch(Number(id));
  }
}

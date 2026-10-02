import {describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ShipmentsService } from './shipments.service';
import { Test } from '@nestjs/testing';
import { ShipmentEntity } from './entities/shipment.entity';
import { getRepositoryToken } from '@nestjs/typeorm/dist/common/typeorm.utils';
import { ShipmentRulesService } from './shipment-rules.service';
import { ShipmentStatus } from './shipment-status.enum';
import { CreateShipmentDto } from './dto/create-shipment.dto';


describe('ShipmentServiceTest', () => {
    let service: ShipmentsService;
    
    const repositoryMock = {
        find: jest.fn<(options: any) => Promise<ShipmentEntity[]>>(),
        findOneBy: jest.fn<(options: any) => Promise<ShipmentEntity | null>>(),
        create: jest.fn(),
        save: jest.fn<(options: any) => Promise<ShipmentEntity>>(),
    }

    const shipmentRulesServiceMock = {  
        ensureCanBeDispatched: jest.fn(),
    }

    beforeEach(async () => {
        jest.clearAllMocks();

        const moduleRef = await Test.createTestingModule({
            providers: [
                ShipmentsService,
                {  
                    provide: getRepositoryToken(ShipmentEntity),
                    useValue: repositoryMock
                },
                {
                    provide: ShipmentRulesService,
                    useValue: shipmentRulesServiceMock
                }
            ]
        }).compile();

        service = moduleRef.get<ShipmentsService>(ShipmentsService);
    })

    it('is defined', () => {
        expect(service).toBeDefined();
    })

    it('getAllShipments should return all shipments', async () => {
        // Arrange
        const mockShipments = [
            { id: 1, trackingCode: 'ABC123', destination: 'New York', status: ShipmentStatus.CREATED },
            { id: 2, trackingCode: 'DEF456', destination: 'Los Angeles', status: ShipmentStatus.DISPATCHED },
        ] as ShipmentEntity[];

        repositoryMock.find.mockResolvedValue(mockShipments);
         
        // Act
        const result = await service.getAllShipments();

        // Assert
        expect(result).toEqual(mockShipments); // Check if the result matches the mock shipments
        expect(repositoryMock.find).toBeCalledTimes(1);
    }); 

    it('getOneShipment should return a shipment by id', async () => {
        // Arrange
        const mockShipment: ShipmentEntity = { id: 1, trackingCode: 'ABC123', destination: 'New York', status: ShipmentStatus.CREATED };

        repositoryMock.findOneBy.mockResolvedValue(mockShipment);

        // Act
        const result = await service.getOneShipment(1);

        // Assert
        expect(result).toEqual(mockShipment);
        expect(repositoryMock.findOneBy).toBeCalledTimes(1);
        expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 });
    })

    it('getOneShipment should throw NotFoundException if shipment not found', async () => {
        // Arrange
        repositoryMock.findOneBy.mockResolvedValue(null);

        //Act & Assert
        await expect(service.getOneShipment(999)).rejects.toThrowError('Shipment 999 not found');
        
    })

    it('createShipment should create and return a new shipment', async () => {
        // Arrange

        // Mock data del envio 
        const data: CreateShipmentDto = {
            trackingCode: 'XYZ789',
            destination: 'Chicago'
        }

        // Mock data de la respuesta
        const createdShipmentMock: ShipmentEntity = {
            ...data,
            id: 3,
            status: ShipmentStatus.CREATED
        }

        //Mock data del save, es decir, lo que guarda en la base de datos
        const savedShipmentMock: ShipmentEntity = {
            ...createdShipmentMock
        }

        repositoryMock.create.mockReturnValue(createdShipmentMock);
        repositoryMock.save.mockResolvedValue(savedShipmentMock);
        
        //Act
        const result = await service.createShipment(data);

        //Assert
        expect(result).toEqual(savedShipmentMock);
        expect(repositoryMock.save).toHaveBeenCalledWith(createdShipmentMock);
        expect(result).toEqual(savedShipmentMock);
    })
})
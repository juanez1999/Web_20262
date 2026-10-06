/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  item!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  customerId!: number;
}

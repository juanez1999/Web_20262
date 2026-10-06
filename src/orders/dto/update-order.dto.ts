/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(80)
  item?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(20)
  quantity?: number;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'ready'])
  status?: 'pending' | 'ready';
}

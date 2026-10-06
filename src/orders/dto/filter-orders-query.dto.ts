/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class FilterOrdersQueryDto {
  @IsString()
  @IsOptional()
  @IsIn(['pending', 'ready'])
  status!: 'pending' | 'ready';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 5;
}

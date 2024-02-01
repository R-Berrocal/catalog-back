import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FindOptionsOrder } from 'typeorm';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto<T> {
  @ApiProperty({
    default: 10,
    description: 'How many rows do you need',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enableImplicitConversions: true
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'How many rows do you want to skip',
  })
  @IsOptional()
  @Min(1)
  @Type(() => Number) // enableImplicitConversions: true
  page?: number;

  relations: string[];

  order: FindOptionsOrder<T>;

  [key: string]: any;
}

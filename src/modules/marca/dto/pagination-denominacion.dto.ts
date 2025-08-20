import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationWithDenominacionDto {
  @ApiPropertyOptional({ description: 'Denominación a filtrar' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : value
  )
  denominacion?: string;

  @ApiPropertyOptional({ example: 0, description: 'Cantidad de filas a saltar (offset)' })
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'skip debe ser un número entero positivo o 0' })
  skip: number = 0;

  @ApiPropertyOptional({ example: 10, description: 'Cantidad de filas a devolver (limit)' })
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: 'take debe ser un número entero mayor que 0' })
  @Max(100, { message: 'take no puede ser mayor a 100' })
  take: number = 10;
}

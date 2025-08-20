import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class MarcaDto {
  @ApiProperty({ example: 123, description: 'ID de la marca' })
  @Type(() => Number)
  @IsInt()
  id: number;

  @ApiProperty({
    example: 'IVECO',
    description: 'Denominación o nombre del producto. Está formado por la línea y la marca',
  })
  @IsString()
  denominacion: string;

  @ApiPropertyOptional({ example: '', description: 'Observaciones varias sobre la marca' })
  @IsOptional()
  @IsString()
  observacion?: string;

  @ApiProperty({ example: 1, description: 'De sistema: no se puede editar ni eliminar' })
  @Type(() => Number)
  @IsInt()
  sistema: number;
}

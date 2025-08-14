import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateMarcaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  denominacion: string;
}

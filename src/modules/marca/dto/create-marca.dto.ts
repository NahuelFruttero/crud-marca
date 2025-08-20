import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional, isString } from 'class-validator';

export class CreateMarcaDto {
  @Transform(({ value }) => value.trim().toLowerCase())
  @IsString({ message: "La denominación debe ser en formato texto" })
  @IsNotEmpty({ message: "La denominación no debe estar vacía" })
  @MinLength(3, { message: "La denominación debe estar formada por al menos 3 caracteres" })
  @MaxLength(30, { message: "La denominación debe estar formada por un máximo de 30 caracteres" })
  @Matches( /^[A-Za-z0-9 áéíóúÁÉÍÓÚñÑ]+$/, { message: "La denominación solo debe contener letras, números y espacios" })
  denominacion: string;


  @IsOptional()
  @IsString()

  observacion?: string;
  createdAt?: Date;
}

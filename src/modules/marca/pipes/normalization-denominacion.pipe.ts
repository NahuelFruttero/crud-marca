import {  Injectable, PipeTransform, ArgumentMetadata, BadRequestException} from '@nestjs/common';

@Injectable()
export class NormalizeDenominacionPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    const d = value?.denominacion;

    if (d === undefined || d === null) return value; // no toca si no viene

    if (typeof d !== 'string') {
      throw new BadRequestException('La denominación debe ser una cadena.');
    }

    // normaliza, trimea, colapsa espacios y pasa a mayúsculas
    const normalized = d
      .normalize('NFC')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();

    if (!normalized.length) {
      throw new BadRequestException('La denominación no puede estar vacía.');
    }

    return { ...value, denominacion: normalized };
  }
}

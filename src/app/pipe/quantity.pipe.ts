import {Pipe, PipeTransform} from '@angular/core';
import {Unit} from '../obj/enum/unit.enum';

@Pipe({
  name: 'formatQuantity'
})
export class QuantityPipe implements PipeTransform {

  transform(valueBase: number, unit: Unit): string {
    if (valueBase == null || unit == null) return '';
    return `${this.formatValue(valueBase)} ${this.getUnitLabel(unit)}`;
  }

  private formatValue(value: number): string {
    // Optional: runde auf max 3 Nachkommastellen
    return String(Math.round(value * 1000) / 1000);
  }

  private getUnitLabel(unit: Unit): string {
    switch (unit) {
      case Unit.UG:
        return 'µg';
      case Unit.MG:
        return 'mg';
      case Unit.G:
        return 'g';
      case Unit.KG:
        return 'kg';
      case Unit.UL:
        return 'µL';
      case Unit.ML:
        return 'mL';
      case Unit.L:
        return 'L';
      case Unit.PIECE:
        return 'Stück';
      case Unit.PACK:
        return 'Pack';
      case Unit.BOX:
        return 'Box';
      case Unit.CANISTER:
        return 'Kanister';
      case Unit.BAG:
        return 'Beutel';
      default:
        return unit;
    }
  }
}

import {DropdownOption} from '../../components/common/dropdown/dropdown';

export enum UnitType {
  MASS = 'MASS',
  VOLUME = 'VOLUME',
  COUNT = 'COUNT'
}

export enum Unit {
  // ===== MASS (Base mg) =====
  UG = 'UG',    // µg
  MG = 'MG',    // mg (base)
  G = 'G',
  KG = 'KG',

  // ===== VOLUME (Base mL) =====
  UL = 'UL',    // µL
  ML = 'ML',    // mL (base)
  L = 'L',

  // ===== COUNT =====
  PIECE = 'PIECE',
  PACK = 'PACK',
  BOX = 'BOX',
  CANISTER = 'CANISTER',
  BAG = 'BAG'
}

export const UnitLabel: Record<Unit, string> = {
  [Unit.UG]: 'µg',
  [Unit.MG]: 'mg',
  [Unit.G]: 'g',
  [Unit.KG]: 'kg',
  [Unit.UL]: 'µL',
  [Unit.ML]: 'mL',
  [Unit.L]: 'L',
  [Unit.PIECE]: 'Stück',
  [Unit.PACK]: 'Pack',
  [Unit.BOX]: 'Box',
  [Unit.CANISTER]: 'Kanister',
  [Unit.BAG]: 'Beutel'
};

// Conversion factors to BASE unit (mg / mL / piece)
export const UnitFactor: Record<Unit, number> = {
  // MASS
  [Unit.UG]: 0.001,        // µg -> mg
  [Unit.MG]: 1,            // mg -> mg -> BASE
  [Unit.G]: 1000,          // g -> mg
  [Unit.KG]: 1_000_000,    // kg -> mg

  // VOLUME
  [Unit.UL]: 0.001,        // µL -> mL
  [Unit.ML]: 1,            // mL -> mL -> BASE
  [Unit.L]: 1000,          // L -> mL

  // COUNT
  [Unit.PIECE]: 1,         // piece -> piece
  [Unit.PACK]: 1,
  [Unit.BOX]: 1,
  [Unit.CANISTER]: 1,
  [Unit.BAG]: 1
};

/** Converts a value to its base unit (mg, mL, piece). */
export function convertToBaseUnit(value: number, unit: Unit): number {
  return value * UnitFactor[unit];
}

/** Converts a base unit value (mg, mL, piece) back to the desired unit. */
export function convertFromBaseUnit(baseValue: number, unit: Unit): number {
  return baseValue / UnitFactor[unit];
}

export class UnitUtil {

  static quantityUnitOptions: DropdownOption<Unit>[] = Object.keys(Unit).map(
    key => ({
      label: UnitLabel[key as keyof typeof Unit],
      value: Unit[key as keyof typeof Unit]
    })
  );
}

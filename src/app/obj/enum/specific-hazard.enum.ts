import {DropdownOption} from '../../components/common/dropdown/dropdown';

export enum SpecifiedHazard {
  OXIDIZER = "OXY",
  ACID = "ACID",
  ALKALI = "ALK",
  CORROSIVE = "CORR",
  USE_NO_WATER = "₩",
  RADIOACTIVE = "☢",
  NONE = "",
}

export const specifiedHazardOptions: DropdownOption<SpecifiedHazard>[] = Object.keys(SpecifiedHazard).map(key => ({
  label: key,
  value: SpecifiedHazard[key as keyof typeof SpecifiedHazard]
}));

export const specifiedHazardOptionsKeys: DropdownOption<keyof SpecifiedHazard>[] = Object.keys(SpecifiedHazard).map(key => ({
  label: key,
  value: key as keyof SpecifiedHazard
}));

export const defaultSpecifiedHazardOptionsKeyIndex = specifiedHazardOptionsKeys.findIndex(option => option.value === 'NONE' as keyof SpecifiedHazard);

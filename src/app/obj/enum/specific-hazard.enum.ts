import {DropdownOption} from '../../components/common/dropdown/dropdown';

export enum SpecifiedHazard {
  OXIDIZER = "OXY",
  ACID = "ACID",
  ALKALI = "ALK",
  CORROSIVE = "CORR",
  USE_NO_WATER = "USE_NO_WATER",
  RADIOACTIVE = "RADIOACTIVE",
  NONE = "",
}

export const SpecifiedHazardLabel: Record<SpecifiedHazard, string> = {
  [SpecifiedHazard.OXIDIZER]: 'OXY',
  [SpecifiedHazard.ACID]: 'ACID',
  [SpecifiedHazard.ALKALI]: 'ALK',
  [SpecifiedHazard.CORROSIVE]: 'CORR',
  [SpecifiedHazard.USE_NO_WATER]: '₩',
  [SpecifiedHazard.RADIOACTIVE]: '☢',
  [SpecifiedHazard.NONE]: 'NONE',
}

export const specifiedHazardOptions: DropdownOption<SpecifiedHazard>[] = Object.keys(SpecifiedHazard).map(
  key => ({
      label: SpecifiedHazardLabel[SpecifiedHazard[key as keyof typeof SpecifiedHazard]],
      value: SpecifiedHazard[key as keyof typeof SpecifiedHazard]
    }
  ));

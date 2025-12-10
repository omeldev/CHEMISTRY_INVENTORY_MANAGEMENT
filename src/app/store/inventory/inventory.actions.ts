/**
 import {ChemicalSubstanceEntryBean} from '../../obj/bean/ChemicalSubstanceEntryBean';

 export namespace InventoryAction {

 const PREFIX = '[Inventory]';

 export class AddSubstance {
 static readonly type = `${PREFIX} Add substance item`;

 constructor(readonly substance: ChemicalSubstanceEntryBean) {
 }
 }

 export class RemoveSubstance {
 static readonly type = `${PREFIX} Remove substance item`;

 constructor(readonly substanceId: number) {

 }
 }

 export class InitSubstances {
 static readonly type = `${PREFIX} Init substance items`;

 constructor(readonly substances: ChemicalSubstanceEntryBean[]) {
 }
 }
 }

 */

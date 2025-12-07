import {Component} from '@angular/core';
import {InventoryService} from '../../service/rest/substance/inventory.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {ChemicalSubstanceEntryForm} from '../chemical-substance-entry-form/chemical-substance-entry-form';
import {Observable} from 'rxjs';
import {ChemicalSubstanceEntryBean} from '../../obj/bean/ChemicalSubstanceEntryBean';

@Component({
  selector: 'chem-substance-inventory-edit',
  imports: [
    AsyncPipe,
    ChemicalSubstanceEntryForm
  ],
  templateUrl: './substance-inventory-edit.html',
  styleUrl: './substance-inventory-edit.scss',
})
export class SubstanceInventoryEdit {


  public inventorySubstanceEntry$: Observable<ChemicalSubstanceEntryBean | null>;

  constructor(private readonly inventoryService: InventoryService,
              private readonly route: ActivatedRoute) {
    this.inventorySubstanceEntry$ = this.inventoryService.getSubstanceInventoryEntry$(
      Number(this.route.snapshot.queryParamMap.get('id'))
    );
  }

}

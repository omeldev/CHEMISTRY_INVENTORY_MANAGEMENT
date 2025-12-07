import {Component} from '@angular/core';
import {InventoryService} from '../../service/rest/substance/inventory.service';
import {firstValueFrom, map, Observable} from 'rxjs';
import {ChemicalSubstanceEntryBean} from '../../obj/bean/ChemicalSubstanceEntryBean';
import {AsyncPipe} from '@angular/common';
import {ChemicalSubstanceBean} from '../../obj/bean/ChemicalSubstanceBean';
import {SubstanceService} from '../../service/rest/substance/substance.service';
import {Router} from '@angular/router';

@Component({
  selector: 'chem-substance-inventory-overview',
  imports: [
    AsyncPipe
  ],
  templateUrl: './substance-inventory-overview.html',
  styleUrl: './substance-inventory-overview.scss',
})
export class SubstanceInventoryOverview {

  public allSubstanceEntries$: Observable<ChemicalSubstanceEntryBean[] | null>;

  public substanceMap$: Observable<Map<number, ChemicalSubstanceBean>>;

  constructor(private readonly inventoryService: InventoryService,
              private readonly substanceService: SubstanceService,
              private readonly router: Router) {
    this.allSubstanceEntries$ = this.inventoryService.getAllSubstanceInventoryEntries$();
    this.substanceMap$ = this.substanceService.getAllSubstances$().pipe(
      map(substances => {
        const map = new Map<number, ChemicalSubstanceBean>();
        substances?.forEach(substance => {
          map.set(Number(substance.id!), substance);
        });
        return map;
      })
    )
  }

  editSubstanceEntry(id: number) {
    return this.router.navigateByUrl(this.router.createUrlTree(['/inventory/edit'], {queryParams: {id}}));
  }

  protected readonly Number = Number;

  async deleteSubstanceEntry(number: number) {
    await firstValueFrom(this.inventoryService.deleteSubstanceInventoryEntry$(number));
  }
}

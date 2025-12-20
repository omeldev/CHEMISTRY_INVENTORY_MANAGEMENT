import {inject, Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {SubstanceService} from '../rest/substance/substance.service';
import {InventoryService} from '../rest/inventory/inventory.service';
import {ExperimentService} from '../rest/experiment/experiment.service';
import {firstValueFrom} from 'rxjs';
import {SubstanceAction} from '../../store/substance/substance.actions';
import {InventoryAction} from '../../store/inventory/inventory.actions';
import {ExperimentAction} from '../../store/experiment/experiment.actions';
import {MaterialService} from '../rest/material/material.service';
import {MaterialAction} from '../../store/material/material.actions';
import {LocationService} from '../rest/location/location.service';
import {LocationAction} from '../../store/location/location.actions';
import {SupplierService} from '../rest/supplier/supplier.service';
import {SupplierAction} from '../../store/supplier/supplier.actions';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private readonly store = inject(Store);

  constructor(
    private readonly substanceService: SubstanceService,
    private readonly inventoryService: InventoryService,
    private readonly experimentService: ExperimentService,
    private readonly materialService: MaterialService,
    private readonly locationService: LocationService,
    private readonly supplierService: SupplierService) {


  }

  public async populateApplication() {
    await firstValueFrom(this.substanceService.getAll$()).then(
      substances => {
        if (substances && substances.length > 0) {
          this.store.dispatch(new SubstanceAction.Init(substances));
        }
      }
    ).then(() => {
      console.log('Substances loaded into store');
    });

    await firstValueFrom(this.inventoryService.getAllSubstanceEntries$()).then(
      substances => {
        if (substances && substances.length > 0) {
          this.store.dispatch(new InventoryAction.InitSubstances(substances));
        }
      }
    ).then(() => {
      console.log('Inventory substances loaded into store');
    });

    await firstValueFrom(this.experimentService.getAllExperiments$()).then(
      experiments => {
        if (experiments && experiments.length > 0) {
          this.store.dispatch(new ExperimentAction.Init(experiments));
        }
      }
    ).then(() => {
      console.log('Experiments loaded into store');
    });

    await firstValueFrom(this.materialService.getMaterials$()).then(
      materials => {
        if (materials && materials.length > 0) {
          this.store.dispatch(new MaterialAction.Initialize(materials));
        }
      }
    ).then(() => {
      console.log('Materials loaded into store');
    });

    await firstValueFrom(this.locationService.getLocations$()).then(
      locations => {
        if (locations && locations.length > 0) {
          this.store.dispatch(new LocationAction.Initialize(locations));
        }
      }
    ).then(() => {
      console.log('Locations loaded into store');
    })

    await firstValueFrom(this.supplierService.getSuppliers$()).then(
      suppliers => {
        if (suppliers && suppliers.length > 0) {
          this.store.dispatch(new SupplierAction.Initialize(suppliers));
        }
      }
    ).then(() => {
        console.log('Suppliers loaded into store');
      }
    )

  }

}

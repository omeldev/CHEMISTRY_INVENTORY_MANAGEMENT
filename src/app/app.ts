import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {select, Store} from '@ngxs/store';
import {SubstanceService} from './service/rest/substance/substance.service';
import {firstValueFrom} from 'rxjs';
import {SubstanceAction} from './store/substance/substance.actions';
import {SubstanceState} from './store/substance/substance.state';
import {Header} from './components/common/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ANGULAR-TEMPLATE-STANDALONE');

  public store = inject(Store);

  constructor(
    private readonly substanceService: SubstanceService) {
    void firstValueFrom(substanceService.getAllSubstances$()).then(
      substances => {
        if (substances && substances.length > 0) {
          this.store.dispatch(new SubstanceAction.Init(substances));
        }
      }
    ).then(() => {
      console.log(select(SubstanceState.getSubstances))
    })
  }
}

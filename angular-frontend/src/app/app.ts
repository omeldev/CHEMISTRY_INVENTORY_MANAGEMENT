import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Navbar} from './components/common/navbar/navbar.component';
import {ToastOverlayComponent} from './components/common/toast-overlay/toast-overlay.component';
import {UserService} from './service/rest/user/user.service';
import {firstValueFrom} from 'rxjs';
import {Store} from '@ngxs/store';
import {UserAction} from './store/user/user.actions';
import {DataService} from './service/data/data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ToastOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {


  constructor(private readonly userService: UserService,
              private readonly store: Store,
              private readonly router: Router,
              private readonly dataService: DataService) {
    void firstValueFrom(this.userService.authenticate$("", "")).then(user => {
      if (user) {
        this.store.dispatch(new UserAction.SetUser(user));
        this.dataService.populateApplication().then(() => this.router.navigateByUrl(this.router.createUrlTree([''])));

      }
    })
  }

}

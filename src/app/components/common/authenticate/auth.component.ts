import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {firstValueFrom, map} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Button} from '../button/button';
import {ButtonType} from '../../../obj/enum/button-type';
import {UserService} from '../../../service/rest/user/user.service';
import {Field, form} from '@angular/forms/signals';
import {Store} from '@ngxs/store';
import {UserAction} from '../../../store/user/user.actions';
import {DataService} from '../../../service/data/data.service';
import {ToastAction} from '../../../store/toast/toast.action';
import {ToastType} from '../../../obj/bean/ToastBean';

interface AuthModelData {
  username: string;
  password: string;
}

@Component({
  selector: 'chem-authenticate',
  imports: [
    AsyncPipe,
    Button,
    Field
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  protected readonly isRegistering$ = this.route.url.pipe(
    map(segments => segments.some(segment => segment.path === 'register'))
  )

  public readonly authModel = signal<AuthModelData>({
    username: '',
    password: ''
  });

  public readonly authForm = form(this.authModel);

  constructor(private readonly userService: UserService,
              private readonly dataService: DataService) {
  }

  protected readonly ButtonType = ButtonType;

  public async authenticate() {
    const isRegistering = await firstValueFrom(this.isRegistering$);
    if (isRegistering) {
      await firstValueFrom(this.userService.createUser$(this.authModel().username, this.authModel().password)).then((user) => {
      });
      await this.router.navigateByUrl(this.router.createUrlTree(['auth', 'login']));
    } else {
      const user = await firstValueFrom(this.userService.authenticate$(this.authModel().username, this.authModel().password)).then(user => {
        this.store.dispatch(new UserAction.SetUser(user));
        this.router.navigateByUrl(this.router.createUrlTree(['']));
        return user;
      });
      if (user) {
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Welcome back, ${user.username}!`,
          type: ToastType.SUCCESS,
          duration: 3000,
        }))
        this.dataService.populateApplication();
      } else {
        this.store.dispatch(new ToastAction.ShowToast({
          message: `Authentication failed. Please check your credentials and try again.`,
          type: ToastType.ERROR,
          duration: 5000,
        }))
      }
    }
  }
}

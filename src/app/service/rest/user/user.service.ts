import {Injectable} from '@angular/core';
import {RestService} from '../rest.service';
import {UserBean} from '../../../obj/bean/user.bean';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private readonly restService: RestService) {
  }

  public isUserExisting$() {
    return this.restService.get$<boolean>('/auth/check');
  }

  public authenticate$(username: string, password: string) {
    return this.restService.post$<UserBean>('/auth/authenticate', {
      username,
      password,
    });
  }

  public createUser$(username: string, password: string) {
    return this.restService.post$<UserBean>('/auth/register', {
      username,
      password,
    });
  }

}

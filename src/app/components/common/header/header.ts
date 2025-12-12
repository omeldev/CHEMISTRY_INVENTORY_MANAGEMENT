import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'chem-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {


  constructor(private readonly router: Router) {
  }

  public navigateToSubstanceOverview() {
    return this.router.createUrlTree(['substance', 'overview']);
  }

  public navigateToInventory() {
    return this.router.createUrlTree(['inventory', 'overview']);
  }

  public navigateToExperiments() {
    return this.router.createUrlTree(['experiment', 'overview']);
  }

}

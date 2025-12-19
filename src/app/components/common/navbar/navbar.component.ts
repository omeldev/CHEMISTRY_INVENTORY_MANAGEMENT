import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'chem-header',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class Navbar {


  constructor(private readonly router: Router) {
  }

  public navigateToDashboard() {
    return this.router.createUrlTree(['']);
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

  public navigateToManagement() {
    return this.router.createUrlTree(['management', 'overview']);
  }
}

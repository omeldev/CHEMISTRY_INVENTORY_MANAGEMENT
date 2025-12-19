import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'chem-management',
  imports: [
    RouterLink
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss',
})
export class ManagementComponent {

  private readonly router = inject(Router);

  public navigateToMaterialOverview() {
    return this.router.createUrlTree(['material', 'overview']);
  }
}

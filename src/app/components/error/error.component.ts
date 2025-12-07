import {Component} from '@angular/core';
import {SpecifiedHazard} from '../../obj/enum/specific-hazard.enum';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {


  protected readonly SpecificHazard = SpecifiedHazard;
}

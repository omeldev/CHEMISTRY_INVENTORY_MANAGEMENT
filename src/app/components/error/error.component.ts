import {Component} from '@angular/core';
import {SafetySquare} from '../safety-square/safety-square';
import {SpecifiedHazard} from '../../obj/enum/specific-hazard.enum';

@Component({
  selector: 'app-error',
  imports: [
    SafetySquare
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {


  protected readonly SpecificHazard = SpecifiedHazard;
}

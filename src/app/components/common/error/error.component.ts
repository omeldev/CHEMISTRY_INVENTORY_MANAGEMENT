import {Component} from '@angular/core';
import {SpecifiedHazard} from '../../../obj/enum/specific-hazard.enum';
import {UnitType} from '../../../obj/enum/unit.enum';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {


  protected readonly SpecificHazard = SpecifiedHazard;
  protected readonly UnitType = UnitType;
}

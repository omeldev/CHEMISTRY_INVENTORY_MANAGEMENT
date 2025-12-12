import {Component, input} from '@angular/core';
import {SpecifiedHazard} from '../../../obj/enum/specific-hazard.enum';

@Component({
  selector: 'chem-safety-square',
  imports: [],
  templateUrl: './safety-square.html',
  styleUrl: './safety-square.scss',
})
export class SafetySquare {


  public fireHazard = input.required<number>();
  public reactivity = input.required<number>();
  public specificHazard = input<keyof typeof SpecifiedHazard>("NONE");
  public healthHazard = input.required<number>();


  protected readonly SpecifiedHazard = SpecifiedHazard;
}

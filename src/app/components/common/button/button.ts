import {Component, input} from '@angular/core';
import {ButtonType} from '../../../obj/enum/button-type';
import {NgClass} from '@angular/common';

@Component({
  selector: 'chem-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  public readonly type = input<ButtonType>();

}

import {AfterViewInit, Component, input, output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

export interface DropdownOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'chem-dropdown',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown<T> implements AfterViewInit {

  public onSelect = output<T>();
  public options = input.required<DropdownOption<T>[]>();

  public label = input<string>();

  constructor() {

  }

  ngAfterViewInit(): void {
    if (this.options().length > 0) {
      this.emitSelect(this.options()[0]);
    }
  }


  public emitSelect(option: DropdownOption<T>) {
    console.log(option);
    this.onSelect.emit(option.value);
  }


  public onSelectFunc(event: Event) {
    const index = Number((event.target as HTMLSelectElement).value);
    const selectedOption = this.options()[index];
    this.emitSelect(selectedOption);
  }
}

import {Component, effect, input, output} from '@angular/core';
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
export class Dropdown<T> {

  public onSelect = output<T>();
  public options = input.required<DropdownOption<T>[]>();

  public selectedIndex = input<number>(0);

  public label = input<string>();

  constructor() {
    // effect will trigger whenever options or selectedIndex changes
    effect(() => {
      const opts = this.options();
      const index = this.selectedIndex() ?? 0;

      if (opts.length === 0) return;

      const validIndex = index >= 0 && index < opts.length ? index : 0;
      this.emitSelect(opts[validIndex]);
    });
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

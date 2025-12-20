import {Component, computed, effect, input, output} from '@angular/core';

export interface DropdownOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'chem-dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown<T> {

  public options = input.required<DropdownOption<T>[]>();
  public selectedOption = input<T | null>(null);
  public label = input<string>();

  public onSelect = output<T>();

  // Derived index (internal only)
  public readonly selectedIndex = computed(() => {
    const opts = this.options();
    const selected = this.selectedOption();

    if (!selected || !opts.length) return 0;

    const index = opts.findIndex(o => o.value === selected);
    return index >= 0 ? index : 0;
  });

  constructor() {
    // Emit selected value when options arrive or selected changes
    effect(() => {
      const opts = this.options();
      if (!opts.length) return;

      const index = this.selectedIndex();
      this.onSelect.emit(opts[index].value);
    });
  }

  public onSelectChange(event: Event) {
    const index = Number((event.target as HTMLSelectElement).value);
    const option = this.options()[index];
    if (!option) return;

    this.onSelect.emit(option.value);
  }
}

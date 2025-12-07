import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstanceInventoryEdit } from './substance-inventory-edit';

describe('SubstanceInventoryEdit', () => {
  let component: SubstanceInventoryEdit;
  let fixture: ComponentFixture<SubstanceInventoryEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubstanceInventoryEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstanceInventoryEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

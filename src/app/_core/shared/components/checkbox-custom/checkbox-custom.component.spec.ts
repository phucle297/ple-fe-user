import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCustomComponent } from './checkbox-custom.component';

describe('CheckboxCustomComponent', () => {
  let component: CheckboxCustomComponent;
  let fixture: ComponentFixture<CheckboxCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxCustomComponent]
    });
    fixture = TestBed.createComponent(CheckboxCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

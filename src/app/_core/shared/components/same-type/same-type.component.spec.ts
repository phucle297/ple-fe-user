import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameTypeComponent } from './same-type.component';

describe('SameTypeComponent', () => {
  let component: SameTypeComponent;
  let fixture: ComponentFixture<SameTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SameTypeComponent]
    });
    fixture = TestBed.createComponent(SameTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

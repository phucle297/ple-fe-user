import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCustomComponent } from './modal-custom.component';

describe('ModalCustomComponent', () => {
  let component: ModalCustomComponent;
  let fixture: ComponentFixture<ModalCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCustomComponent]
    });
    fixture = TestBed.createComponent(ModalCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

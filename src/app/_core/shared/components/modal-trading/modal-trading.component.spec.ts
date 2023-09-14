import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTradingComponent } from './modal-trading.component';

describe('ModalTradingComponent', () => {
  let component: ModalTradingComponent;
  let fixture: ComponentFixture<ModalTradingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTradingComponent]
    });
    fixture = TestBed.createComponent(ModalTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

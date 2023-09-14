import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuctionComponent } from './modal-auction.component';

describe('ModalAuctionComponent', () => {
  let component: ModalAuctionComponent;
  let fixture: ComponentFixture<ModalAuctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAuctionComponent]
    });
    fixture = TestBed.createComponent(ModalAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

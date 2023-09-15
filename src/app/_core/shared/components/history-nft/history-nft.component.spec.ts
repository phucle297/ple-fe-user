import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryNftComponent } from './history-nft.component';

describe('HistoryNftComponent', () => {
  let component: HistoryNftComponent;
  let fixture: ComponentFixture<HistoryNftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryNftComponent]
    });
    fixture = TestBed.createComponent(HistoryNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

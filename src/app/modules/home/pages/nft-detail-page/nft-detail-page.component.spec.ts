import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftDetailPageComponent } from './nft-detail-page.component';

describe('NftDetailPageComponent', () => {
  let component: NftDetailPageComponent;
  let fixture: ComponentFixture<NftDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NftDetailPageComponent]
    });
    fixture = TestBed.createComponent(NftDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

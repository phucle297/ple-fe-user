import { Component, OnInit } from '@angular/core';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { NftService } from '@app/_core/services/nft.service';

@Component({
  selector: 'app-same-type',
  templateUrl: './same-type.component.html',
  styleUrls: ['./same-type.component.scss'],
})
export class SameTypeComponent implements OnInit {
  sameTypeItems: IProductItem[] = [];

  constructor(private nftService: NftService) {}

  async ngOnInit() {
    this.nftService.getNftByType('nfn').subscribe((res) => {
      this.sameTypeItems = res;
    });
  }
  generateLink(nftId?: string | null | undefined) {
    if (!nftId) return '';
    return window.location.origin + '/nft-detail/' + nftId;
  }
}

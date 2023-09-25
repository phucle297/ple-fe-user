import { Component, OnInit } from '@angular/core';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { GlobalService } from '@app/_core/services/global.service';
import { NftService } from '@app/_core/services/nft.service';

@Component({
  selector: 'app-same-type',
  templateUrl: './same-type.component.html',
  styleUrls: ['./same-type.component.scss'],
})
export class SameTypeComponent implements OnInit {
  item!: IProductItem;
  sameTypeItems: IProductItem[] = [];

  constructor(
    private nftService: NftService,
    private globalService: GlobalService
  ) {}

  async ngOnInit() {
    this.globalService.nftItem$.subscribe((res) => {
      this.nftService.getNftByType(res.type as string).subscribe((res) => {
        this.sameTypeItems = res;
      });
    });
  }
  generateLink(nftId?: string | null | undefined) {
    if (!nftId) return '';
    return window.location.origin + '/nft-detail/' + nftId;
  }
}

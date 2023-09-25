import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusEnum } from '@app/_core/constants/status-enum';
import { IHistoryNft } from '@app/_core/interfaces/HistoryNft.interface';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { WalletService } from '@app/_core/services/wallet.service';
import { NftService } from '@app/_core/services/nft.service';
import { GlobalService } from '@app/_core/services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nft-detail-page',
  templateUrl: './nft-detail-page.component.html',
  styleUrls: ['./nft-detail-page.component.scss'],
})
export class NftDetailPageComponent implements OnInit, OnDestroy {
  item: IProductItem = {};
  btnShown = [
    'create_trading',
    'create_auction',
    'cancel_auction',
    'cancel_trading',
    'cancel',
    'buy',
    'bid',
  ];
  walletSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private nftService: NftService,
    private walletService: WalletService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const nftId = this.activatedRoute.snapshot.paramMap.get('id');

    this.walletSub = this.walletService.walletLocalStorage.subscribe(
      async (wallet: any) => {
        if (nftId) {
          const res: IProductItem = await this.nftService.getNftById(nftId);
          this.item = res;
          this.globalService.nftItem = res;
          this.globalService.nftHistory =
            await this.nftService.getHistoryNftById(
              this.item.type!,
              nftId,
              1,
              10
            );

          if (wallet?.toLowerCase() === this.item.owner?.toLowerCase()) {
            if (this.item.status === StatusEnum.ASSET) {
              this.btnShown = ['create_trading', 'create_auction'];
            } else if (this.item.status === StatusEnum.TRADING) {
              this.btnShown = ['cancel_trading'];
            } else if (this.item.status === StatusEnum.AUCTION) {
              this.btnShown = ['cancel_auction'];
            } else {
              this.btnShown = ['cancel'];
            }
          } else {
            if (this.item.status === StatusEnum.ASSET) {
              this.btnShown = [];
            } else if (this.item.status === StatusEnum.TRADING) {
              this.btnShown = ['buy'];
            } else if (this.item.status === StatusEnum.AUCTION) {
              this.btnShown = ['bid'];
            }
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.walletSub.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryTypeEnum } from '@app/_core/constants/history-type-enum';
import { IHistoryNft } from '@app/_core/interfaces/HistoryNft.interface';
import { GlobalService } from '@app/_core/services/global.service';
import { Subscription } from 'rxjs';
import { ShortenAddressPipe } from '../../pipes/shortenAddress.pipe';

@Component({
  selector: 'app-history-nft',
  templateUrl: './history-nft.component.html',
  styleUrls: ['./history-nft.component.scss'],
})
export class HistoryNftComponent implements OnInit, OnDestroy {
  history: IHistoryNft[] = [];
  historySub!: Subscription;
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.historySub = this.globalService.nftHistory$.subscribe((res) => {
      this.history = res;
    });
  }

  ngOnDestroy(): void {
    this.historySub.unsubscribe();
  }

  renderContent(item: IHistoryNft) {
    switch (item.action) {
      case HistoryTypeEnum.BID:
        return 'Bid';

      case HistoryTypeEnum.BURN:
        return 'Burn';

      case HistoryTypeEnum.BUY:
        return 'Buy';

      case HistoryTypeEnum.CANCEL_AUCTION:
        return 'Cancel Auction';

      case HistoryTypeEnum.CANCEL_TRADING:
        return 'Cancel Trading';

      case HistoryTypeEnum.CREATE_AUCTION:
        return 'Create Auction';

      case HistoryTypeEnum.CREATE_TRADING:
        return 'Create Trading';

      case HistoryTypeEnum.END_AUCTION:
        return 'End Auction';

      case HistoryTypeEnum.END_TRADING:
        return 'End Trading';

      case HistoryTypeEnum.EXPIRED:
        return 'Expired';

      case HistoryTypeEnum.MINT:
        return 'Mint';

      case HistoryTypeEnum.TRANSFER:
        return 'Transfer';

      case HistoryTypeEnum.WITHDRAW:
        return 'Withdraw';

      default:
        return '';
    }
  }
}

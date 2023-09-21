import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryTypeEnum } from '@app/_core/constants/history-type-enum';
import { IHistoryNft } from '@app/_core/interfaces/HistoryNft.interface';
import { GlobalService } from '@app/_core/services/global.service';
import { Subscription } from 'rxjs';
import { ShortenAddressPipe } from '../../pipes/shortenAddress.pipe';
import { environment } from '@env/environment';

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

  shortenAddress(str: string) {
    return new ShortenAddressPipe().transform(str);
  }

  renderContent(item: IHistoryNft) {
    switch (item.action) {
      case HistoryTypeEnum.BID: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> bid ${item.price} PLE at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.BURN: {
        let sentence = '';
        sentence += `This NFT was burned at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.BUY: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> bought this NFT from `;
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.to}" target="_blank">${this.shortenAddress(
          item.to as string
        )}</a> at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.CANCEL_AUCTION: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> canceled the auction at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.CANCEL_TRADING: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> canceled the trading at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.CREATE_AUCTION: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> created an auction at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;

        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.CREATE_TRADING: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> created a trading at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.END_AUCTION: {
        let sentence = '';
        sentence += 'Auction ended at ';
        sentence += new Date(Number(item.date) * 1000).toLocaleString();

        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.END_TRADING: {
        let sentence = '';
        sentence += 'Trading ended at ';
        sentence += new Date(Number(item.date) * 1000).toLocaleString();

        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.MINT: {
        let sentence = '';
        sentence += `This NFT was minted at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;

        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.TRANSFER: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> transferred this NFT to `;
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.to}" target="_blank">${this.shortenAddress(
          item.to as string
        )}</a> at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;
        return `<p class="normal">${sentence}</p>`;
      }

      case HistoryTypeEnum.WIN_AUCTION: {
        let sentence = '';
        sentence += `<a class="link" href="${
          environment.ETHERSCAN_URL
        }/address/${item.from}" target="_blank">${this.shortenAddress(
          item.from as string
        )}</a> won the auction at `;
        sentence += new Date(Number(item.date) * 1000).toLocaleString();
        sentence += ` at <a target="_blank" class="link" href="${
          environment.ETHERSCAN_URL
        }/tx/${item.txnHash}">${this.shortenAddress(
          item.txnHash as string
        )}<a/>`;

        return `<p class="normal">${sentence}</p>`;
      }

      default:
        return '';
    }
  }
}

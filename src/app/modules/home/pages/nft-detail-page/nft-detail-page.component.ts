import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHistoryNft } from '@app/_core/interfaces/HistoryNft.interface';
import { NftService } from '@app/_core/services/nft.service';

@Component({
  selector: 'app-nft-detail-page',
  templateUrl: './nft-detail-page.component.html',
  styleUrls: ['./nft-detail-page.component.scss'],
})
export class NftDetailPageComponent {
  history: IHistoryNft[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private nftService: NftService
  ) {}

  ngOnInit(): void {
    const nftId = this.activatedRoute.snapshot.paramMap.get('id');

    // this.nftService.getNftById('nfn', nftId).subscribe((res: any) => {
    //   this.history = res.history;
    // });
  }
}

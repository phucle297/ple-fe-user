import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history-nft',
  templateUrl: './history-nft.component.html',
  styleUrls: ['./history-nft.component.scss'],
})
export class HistoryNftComponent {
  @Input() history: any[] = [];
}

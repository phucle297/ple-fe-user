import { Injectable } from '@angular/core';
import { IHistoryNft } from '../interfaces/HistoryNft.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _nftHistory = new BehaviorSubject<IHistoryNft[]>([]);

  get nftHistory$() {
    return this._nftHistory.asObservable();
  }

  set nftHistory(value: IHistoryNft[]) {
    this._nftHistory.next(value);
  }
}

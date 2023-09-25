import { Injectable } from '@angular/core';
import { IHistoryNft } from '../interfaces/HistoryNft.interface';
import { BehaviorSubject } from 'rxjs';
import { IProductItem } from '../interfaces/ProductItem.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _nftHistory = new BehaviorSubject<IHistoryNft[]>([]);
  private _nftItem = new BehaviorSubject<IProductItem>({});
  private _openSidebar = new BehaviorSubject<boolean>(false);
  private _width = new BehaviorSubject<number>(0);

  get width$() {
    return this._width.asObservable();
  }

  set width(value: number) {
    this._width.next(value);
  }

  get nftItem$() {
    return this._nftItem.asObservable();
  }

  set nftItem(value: IProductItem) {
    this._nftItem.next(value);
  }

  set openSidebar(value: boolean) {
    this._openSidebar.next(value);
  }

  get openSidebar$() {
    return this._openSidebar.asObservable();
  }

  get nftHistory$() {
    return this._nftHistory.asObservable();
  }

  set nftHistory(value: IHistoryNft[]) {
    this._nftHistory.next(value);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { productListMock } from '../mocks/ProductList.mock';
import { IProductItem } from '../interfaces/ProductItem.interface';
import { historyNftMock } from '../mocks/HistoryNft.mock';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NftService {
  private apiBaseUrl = environment.API_BASE_URL;
  constructor(private http: HttpClient) {}

  getNftById(id: string): IProductItem {
    const url = `${this.apiBaseUrl}/nft/${id}`;
    return productListMock.find((item) => item.nftId === id) as IProductItem;
  }

  getHistoryNftById(
    type: string,
    id: string,
    page: number = 1,
    limit: number = 10
  ) {
    const url = `${this.apiBaseUrl}/nft/${type}/${id}/history?page=${page}&limit=${limit}`;
    const res = this.http.get(url);

    // return res;
    return historyNftMock.slice(0, 10);
  }

  getNftByType(
    type: string,
    page: number = 1,
    limit: number = 10
  ): Observable<IProductItem[]> {
    const url = `${this.apiBaseUrl}/nft/${type}?page=${page}&limit=${limit}`;
    const res = this.http.get(url);
    // return res;
    const fakeRes = productListMock.slice(0, 4);
    return new Observable<IProductItem[]>((observer) => {
      observer.next(fakeRes);
    });
  }
}

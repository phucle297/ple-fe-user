import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { productListMock } from '../mocks/ProductList.mock';
@Injectable({
  providedIn: 'root',
})
export class NftService {
  private apiBaseUrl = environment.API_BASE_URL;
  constructor(private http: HttpClient) {}

  getNftById(type: string, id: string) {
    const url = `${this.apiBaseUrl}/nft/${type}/${id}`;
    const fakeData = productListMock

  }

  getHistoryNftById(type: string, id: string, page: number, limit: number) {
    const url = `${this.apiBaseUrl}/nft/${type}/${id}/history`;
    const res = this.http.get(url);

    return res;
  }
}

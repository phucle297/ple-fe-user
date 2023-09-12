import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input('item') item: IProductItem = {} as IProductItem;
  allowChangePage: boolean = true;
  isOpenModalTrading: boolean = false;
  isOpenModalAuction: boolean = false;

  constructor(private router: Router) {}
  handleClickCard() {
    if (this.allowChangePage) {
      this.router.navigate(['/nft-detail', this.item.nftId]);
    }
  }

  onMouseOverControlBtn() {
    this.allowChangePage = false;
  }

  onMouseLeaveControlBtn() {
    this.allowChangePage = true;
  }

  onClickControlBtn(type: string) {
    this.allowChangePage = false;

    switch (type) {
      case 'trading': {
        console.log('trading');
        this.isOpenModalTrading = true;
        break;
      }
      case 'auction': {
        console.log('auction');
        this.isOpenModalAuction = true;
        break;
      }
      default:
        return;
    }
  }

  handleCloseModal() {
    this.isOpenModalTrading = false;
    this.isOpenModalAuction = false;
  }
}

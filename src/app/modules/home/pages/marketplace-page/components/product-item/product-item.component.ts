import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StatusEnum } from '@app/_core/constants/status-enum';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { ModalService } from '@app/_core/services/modal.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input('item') item: IProductItem = {} as IProductItem;
  StatusEnum = StatusEnum;
  allowChangePage: boolean = true;

  constructor(private router: Router, private modalService: ModalService) {}
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
        this.modalService.openModal({
          type: 'trading',
          data: this.item,
        });
        break;
      }
      case 'auction': {
        this.modalService.openModal({
          type: 'auction',
          data: this.item,
        });
        break;
      }
      default:
        return;
    }
  }
}

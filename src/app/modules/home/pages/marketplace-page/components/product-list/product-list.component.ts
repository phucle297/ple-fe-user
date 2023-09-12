import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input('listItems') listItems: IProductItem[] = [];
  @Output('handleModal') handleModal = new EventEmitter<any>();

  constructor() {}

  handleModalList({
    type,
    bool,
    item,
  }: {
    type: string;
    bool: boolean;
    item: IProductItem;
  }) {
    this.handleModal.emit({ type, bool, item });
  }
}

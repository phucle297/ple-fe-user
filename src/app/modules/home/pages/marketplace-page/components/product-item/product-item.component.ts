import { Component, Input } from '@angular/core';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input('item') item: IProductItem = {} as IProductItem;
}

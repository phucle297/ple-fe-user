import { Component, Input } from '@angular/core';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input('listItems') listItems: IProductItem[] = [];
}

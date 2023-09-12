import { Component, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { SearchAndFilterComponent } from './components/search-and-filter/search-and-filter.component';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { productListMock } from '@app/_core/mocks/ProductList.mock';
@Component({
  selector: 'app-marketplace-page',
  templateUrl: './marketplace-page.component.html',
  styleUrls: ['./marketplace-page.component.scss'],
})
export class MarketplacePageComponent {
  @ViewChild('searchAndFilter', { static: true })
  searchAndFilterComponent!: SearchAndFilterComponent;
  listItems: IProductItem[] = [];
  isOpenModalTrading: boolean = false;
  isOpenModalAuction: boolean = false;
  chosenItem: IProductItem = {} as IProductItem;

  constructor() {
    this.listItems = productListMock;
  }

  ngOnInit() {
    this.setupFormChangeListeners();
  }

  private setupFormChangeListeners() {
    this.searchAndFilterComponent.searchAndFilterForm.valueChanges
      .pipe(debounceTime(300)) // Add debounceTime to avoid rapid API calls
      .subscribe((formValue) => {
        // Call your API service with the form values
        if (formValue) this.callApiWithFormValues(formValue);
      });
  }

  private callApiWithFormValues(formValue: any) {
    console.log(formValue);
    // Here, you can call your API service with the form values
    // and implement pagination logic based on the received data
    // this.apiService.getProducts(formValue).subscribe((data) => {
    // Handle API response and update your component's data
    // });
  }

  handleModal({
    type,
    bool,
    item,
  }: {
    type: string;
    bool: boolean;
    item: IProductItem;
  }) {
    switch (type) {
      case 'trading': {
        this.isOpenModalTrading = bool;
        this.isOpenModalAuction = false;
        break;
      }
      case 'auction': {
        this.isOpenModalAuction = bool;
        this.isOpenModalTrading = false;
        break;
      }
      default:
        this.isOpenModalTrading = false;
        this.isOpenModalAuction = false;
        return;
    }
    this.chosenItem = item;
  }
}

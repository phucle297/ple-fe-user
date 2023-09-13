import { Component, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { SearchAndFilterComponent } from './components/search-and-filter/search-and-filter.component';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { productListMock } from '@app/_core/mocks/ProductList.mock';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ModalService } from '@app/_core/services/modal.service';
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
  isOpenModal: boolean = false;

  constructor(private router: Router, private modalService: ModalService) {
    this.listItems = productListMock;
  }

  ngOnInit() {
    this.setupFormChangeListeners();
    this.modalService.showModal$.subscribe((bool) => {
      console.log(bool);
      this.isOpenModal = bool;
    });
  }

  private setupFormChangeListeners() {
    this.searchAndFilterComponent.searchAndFilterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((formValue: any) => {
        if (formValue) {
          const newForm = { ...formValue };

          // Remove empty fields from the form
          Object.keys(newForm).forEach((key) => {
            if (
              (newForm[key] === '' && typeof newForm[key] === 'string') ||
              !newForm[key] ||
              (newForm[key].length === 0 && Array.isArray(newForm[key]))
            ) {
              delete newForm[key];
            }
          });
          this.router.navigate(['/marketplace'], {
            queryParams: formValue,
          });
          this.callApiWithFormValues(formValue);
        }
      });
  }

  private callApiWithFormValues(formValue: any) {
    // Here, you can call your API service with the form values
    // and implement pagination logic based on the received data
    // this.apiService.getProducts(formValue).subscribe((data) => {
    // Handle API response and update your component's data
    // });
    console.log(formValue);
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

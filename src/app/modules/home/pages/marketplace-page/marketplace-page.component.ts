import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusText } from '@app/_core/constants/status-enum';
import { IProductItem } from '@app/_core/interfaces/ProductItem.interface';
import { productListMock } from '@app/_core/mocks/ProductList.mock';
import { ModalService } from '@app/_core/services/modal.service';
import { debounceTime } from 'rxjs/operators';
import { SearchAndFilterComponent } from './components/search-and-filter/search-and-filter.component';
@Component({
  selector: 'app-marketplace-page',
  templateUrl: './marketplace-page.component.html',
  styleUrls: ['./marketplace-page.component.scss'],
})
export class MarketplacePageComponent {
  @ViewChild('searchAndFilter', { static: true })
  searchAndFilterComponent!: SearchAndFilterComponent;
  typeModal!: string;
  listItems: IProductItem[] = [];
  isOpenModal: boolean = false;

  constructor(private router: Router, private modalService: ModalService) {
    this.listItems = productListMock;
  }

  ngOnInit() {
    this.setupFormChangeListeners();
    this.modalService.showModal$.subscribe((bool) => {
      this.isOpenModal = bool;
    });
    this.modalService.modalData$.subscribe((data) => {
      const listType = ['auction', 'trading'];
      if (listType.includes(data?.type)) {
        this.typeModal = data.type;
      }
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
    console.log(formValue);
    let newArr = [...productListMock];
    const { category, priceMax, priceMin, search, status } = formValue;

    if (priceMin && priceMax) {
      newArr = newArr.filter((item) => {
        return +item.price >= +priceMin && +item.price <= +priceMax;
      });
    }

    if (search) {
      newArr = newArr.filter((item) => {
        return (
          item.attributes.name.toLowerCase().includes(search.toLowerCase()) ||
          item.attributes.description
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.owner.toLowerCase().includes(search.toLowerCase()) ||
          item.nftId.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (Array.isArray(status) && status?.length > 0) {
      newArr = newArr.filter((item) => {
        return status.includes(StatusText[item.status].toLowerCase());
      });
    }

    if (Array.isArray(category) && category.length > 0) {
      newArr = newArr.filter((item) => {
        return category.includes(item.type.toLowerCase());
      });
    }

    this.listItems = newArr;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  DEFAULT_MAX_PRICE_RANGE,
  MAX_PRICE_RANGE,
} from '@app/_core/constants/price-range';

@Component({
  selector: 'app-search-and-filter',
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.scss'],
})
export class SearchAndFilterComponent {
  minValue: number = 0;
  maxValue: number = MAX_PRICE_RANGE;

  priceRange: number[] = [0, DEFAULT_MAX_PRICE_RANGE];
  searchAndFilterForm = new FormGroup({
    search: new FormControl(''),
    category: new FormControl(['']),
    status: new FormControl(['']),
    priceMin: new FormControl(''),
    priceMax: new FormControl(''),
  });

  private modifyCheckBox(
    typeOfCheckbox: keyof { status: string[]; category: string[] },
    bool: boolean,
    nameField: string
  ) {
    if (bool) {
      const fields: string[] = this.searchAndFilterForm.controls[typeOfCheckbox]
        .value as string[];
      this.searchAndFilterForm.controls[typeOfCheckbox].patchValue([
        ...fields,
        nameField,
      ]);
    } else {
      const fields: string[] = this.searchAndFilterForm.controls[typeOfCheckbox]
        .value as string[];
      this.searchAndFilterForm.controls[typeOfCheckbox].patchValue([
        ...fields.filter((item) => item !== nameField),
      ]);
    }

    this.searchAndFilterForm.controls[typeOfCheckbox].patchValue(
      this.searchAndFilterForm.controls[typeOfCheckbox].value!.filter(
        (item) => item !== ''
      )
    );
  }

  private modifyValueFormControl(
    typeOfFormControl: keyof {
      search: string;
      priceMin: number;
      priceMax: number;
    },
    value: string
  ) {
    this.searchAndFilterForm.controls[typeOfFormControl].patchValue(value);
  }
  handleEventChecked(bool: boolean, nameField: string) {
    switch (nameField) {
      case 'trading':
      case 'auction':
      case 'expired':
      case 'static':
        this.modifyCheckBox('status', bool, nameField);
        break;
      case 'nfn':
      case 'nnm':
      case 'gfn':
      case 'kfm':
        this.modifyCheckBox('category', bool, nameField);
        break;
      default:
        break;
    }
  }

  onSubmit() {
    console.log(this.searchAndFilterForm.value);
  }

  handlePriceChange(e: any, type: 'min' | 'max' | 'range') {
    switch (type) {
      case 'min':
        if (this.minValue < 0) this.minValue = 0;
        if (e.value > this.maxValue) {
          this.minValue = this.maxValue;
          this.maxValue = e.value;
          this.priceRange = [
            ...[
              (this.minValue / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
              (this.maxValue / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
            ],
          ];
        } else {
          this.priceRange = [
            ...[
              (e.value / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
              (this.maxValue / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
            ],
          ];
        }
        break;
      case 'max':
        if (this.maxValue > MAX_PRICE_RANGE) this.maxValue = MAX_PRICE_RANGE;
        if (e.value < this.minValue) {
          this.maxValue = this.minValue;
          this.minValue = e.value;
          this.priceRange = [
            ...[
              (this.minValue / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
              (this.maxValue / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
            ],
          ];
        } else {
          this.priceRange = [
            ...[
              (this.minValue / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
              (e.value / MAX_PRICE_RANGE) * DEFAULT_MAX_PRICE_RANGE,
            ],
          ];
        }
        break;
      case 'range':
        this.minValue = Math.round(
          (e.values[0] / DEFAULT_MAX_PRICE_RANGE) * MAX_PRICE_RANGE
        );
        this.maxValue = Math.round(
          (e.values[1] / DEFAULT_MAX_PRICE_RANGE) * MAX_PRICE_RANGE
        );
        if (this.minValue > this.maxValue) {
          let temp = this.minValue;
          this.minValue = this.maxValue;
          this.maxValue = temp;
        }
        break;
      default:
        break;
    }

    this.modifyValueFormControl('priceMin', this.minValue.toString());
    this.modifyValueFormControl('priceMax', this.maxValue.toString());
  }
}

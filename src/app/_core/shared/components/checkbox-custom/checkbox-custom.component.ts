import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-custom',
  templateUrl: './checkbox-custom.component.html',
  styleUrls: ['./checkbox-custom.component.scss'],
})
export class CheckboxCustomComponent {
  isChecked = false;
  @Output() handleEventChecked = new EventEmitter<boolean>();
  @Input() checked: boolean = false;

  ngOnInit() {
    this.isChecked = this.checked;
  }
  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    this.handleEventChecked.emit(this.isChecked);
  }
}

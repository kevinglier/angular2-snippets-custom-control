import { Component, forwardRef, Input, Renderer, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomRadioInputComponent),
    multi: true
};

@Component({
  selector: 'custom-radio-input',
  template: `
    <fieldset>
      <div *ngFor="let value of values">
        <input #radioInput type="radio" [(ngModel)]="selectedValue" [value]="value" /> {{value}}
      </div>
    </fieldset>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styles: [`
      :host {
          display: block;
      }
  `]
})
export class CustomRadioInputComponent implements ControlValueAccessor, OnInit {

  @ViewChildren('radioInput') radioInputQueryList = new QueryList<ElementRef>();

  @Input() values: any[];

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  private _selectedValue: any = null;

  get selectedValue(index) {

    return this._selectedValue;
  }

  set selectedValue(value) {
    
    this._selectedValue = value;
    this.onChangeCallback(this._selectedValue);
  }
    
  constructor(
      private renderer: Renderer
  ) { }

  ngOnInit() { }

  // from ControlValueAccessor interface
  // selectedValue is the value that is passed through "ngModel" or formGrouo.controls[0].setValue('new Value')
  writeValue(selectedValue: any) {
    
    if (this.selectedValue != selectedValue && this.values.some(v => v == selectedValue)) {
      
      this.selectedValue = selectedValue;
    }
  }

  // from ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  // from ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

  // from ControlValueAccessor interface (optional but useful)
  setDisabledState(isDisabled: boolean) {
      
      this.radioInputQueryList.forEach(element => {

          this.renderer.setElementProperty(element.nativeElement, 'disabled', isDisabled);
      });
  }
}
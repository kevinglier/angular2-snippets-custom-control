//our root app component
import {Component, NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import { CustomRadioInputComponent } from './custom-radio-input.component'

@Component({
  selector: 'my-app',
  template: `
    <div>
    
      <h2>ngModel</h2>
      <custom-radio-input [values]="values" [(ngModel)]="value1"></custom-radio-input>
      
      <h2>ReactiveFormsModule</h2>
      <form [formGroup]="form">
        <custom-radio-input formControlName="value2" [values]="values"></custom-radio-input>
      </form>
      <input type="checkbox" (click)="setControlDisabledState($event.target.checked)"> Disable Control
    </div>
  `,
})
export class App {
  
  private values = ['Red', 'Green', 'Blue'];
  
  private value1: string;
  private value2: string;
  private value3: string;
  
  private set formControlEnabled(value) {
    this.form.controls['value2']
  }
  
  form = new FormGroup({
    value2: new FormControl('Green')
  });
  
  constructor() {
    
  }
  
  private setControlDisabledState(disabled) {
    
    if (disabled) {
      
      this.form.controls['value2'].disable();
    }
    else {
      
      this.form.controls['value2'].enable();
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    App,
    CustomRadioInputComponent
  ],
  bootstrap: [ App ]
})
export class AppModule {}
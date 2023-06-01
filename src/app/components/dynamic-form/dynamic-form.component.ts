import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldConfig } from './models/field-config.model';
//import { this.sett } from.name './helpers/data-types';

@Component({
  selector: 'fgeDynamicField',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fieldConfigs: FieldConfig[] = [];
  @Input() settingDataTypes: any[] = [];
  @Output() readonly onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly oncancel: EventEmitter<any> = new EventEmitter<any>();

  public formParent: FormGroup = new FormGroup({});
  selectedType: string = '';
  //dataTypes = this.sett;
  // errors.name: string[] = [];

  constructor() { }

  sett: any;
  ngOnInit(): void {
    this.sett = this.settingDataTypes.reduce((acc, item) => {
      acc[item.name.toLowerCase()] = item;
      return acc;
    }, {});
    this.initFormParent();
  }

  initFormParent(): void {
    let form = new FormGroup({});
    this.fieldConfigs.forEach((control) => {
      form.addControl(control.name, new FormControl({ value: control.value, disabled: control.disabled }, control.validation?.validator));
    });
    form.addControl('child', new FormArray([], [Validators.required]));
    this.formParent = form;
  }

  loadData() {
    this.formParent.patchValue(this.fieldConfigs);
  }

  initFormChild(childField: any) {
    let formChild = new FormGroup({});
    const field = this.fieldConfigs.find(f => f.type == 'text');
    formChild.addControl(childField.name, new FormControl({ value: field?.value, disabled: field?.disabled }, [Validators.required]));
    return formChild;
  }

  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }

  onDataTypeChange(ev: any) {
    this.selectedType = ev.target.value;
    switch (this.selectedType) {
      case this.sett.string.name:
        const refChild = this.formParent.get('child') as FormArray;
        refChild.clear();
        refChild.push(this.initFormChild(this.sett.string));
        break;
      case this.sett.boolean.name:

        break;
      case this.sett.date.name:

        break;
      case this.sett.decimal.name:

        break;
      case this.sett.integer.name:

        break;
      case this.sett.json.name:

        break;
      case this.sett.privateFile.name:

        break;
      case this.sett.stringEnum.name:

        break;
      case this.sett.timespan.name:

        break;

      default:
        console.log(this.sett.string.name);
        break;
    }
  }

  /* handleSubmit(event: Event) {
    console.log(event, this.formParent);
    event.preventDefault();
    event.stopPropagation();
    if (this.formParent.valid) {
      this.resetAsyncFlags();
      this.onsubmit.emit({
        //value: this.value,
        success: this.asyncSuccess.bind(this),
        error: this.asyncError.bind(this),
      });
    } else {
      this.validateAllFormFields();
      this.setDisabled('save', !this.formParent.valid);
    }
  }

  handleSaveAction(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.handleSubmit(event);
  }

  handleCancel(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.oncancel.emit();
  }

  asyncSuccess() {
    this.loadingAsyncResponse = false;
  }

  asyncError(errorMsg: string[]) {
    this.loadingAsyncResponse = false;
    this.errors = errorMsg;
  }

  setDisabled(name: string, disable: boolean) {
    if (this.formParent.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.formParent.controls[name][method]();
      return;
    }

    this.fieldConfigs = this.fieldConfigs.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.formParent?.controls[name].setValue(value, { emitEvent: true });
  }

  private resetAsyncFlags() {
    this.loadingAsyncResponse = true;
    this.errors = [];
  }

  private getValidators(validationConfig: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    Object.keys(validationConfig).forEach((validatorKey) => {
      validators.push(validationConfig[validatorKey].validator);
    });
    return validators;
  }

  validateAllFormFields(formGroup?: FormGroup) {
    const currentGroup = formGroup || this.formParent;
    if (currentGroup)
      Object.keys(currentGroup.controls).forEach((field) => {
        const control = currentGroup?.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
  } */
}

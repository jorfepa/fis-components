import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { FieldConfig } from './models/field-config.model';
import _ from 'lodash';

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

  @ViewChildren('formField') refFormField: ElementRef;

  public formParent: FormGroup = new FormGroup({});
  selectedType: string = '';
  optionIndex: number = 0;

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
      console.log(control);
      form.addControl(control.name, new FormControl({ value: control.value, disabled: control.disabled }, control.validation?.validator));
    });
    this.formParent = form;
  }

  selectedDataType: any;
  DYNAMIC_FIELD = 'field';
  onDataTypeChange(ev: any) {
    this.selectedDataType = _.compact(this.settingDataTypes.map(items => items.name == ev.target.value ? items : null))[0];
    // this.fieldConfigs[3].type = this.selectedType;
    //this.formParent.removeControl('String');
    const selectedfield = this.fieldConfigs.find(field=>!field.isStatic);
    console.log(this.getControlName(this.formParent.get(selectedfield.name)));
    this.formParent.get('String')?.clearValidators();
    this.formParent.get('String')?.updateValueAndValidity();
    this.formParent.get('String')?.addValidators(Validators.required);
    if (this.selectedDataType.validationPattern != null && this.selectedDataType.name != this.sett.date.name && this.selectedDataType.name != this.sett.boolean.name) {
      this.formParent.get('String')?.addValidators(Validators.pattern(this.selectedDataType.validationPattern));
    }
    setTimeout(() => {
      document.getElementById(this.selectedDataType.name).focus();
    }, 200);
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
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

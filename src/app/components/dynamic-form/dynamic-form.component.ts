import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldConfig } from './models/field-config.model';

@Component({
  selector: 'fgeDynamicField',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fieldConfigs: FieldConfig[] = [];
  @Output() readonly onsubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly oncancel: EventEmitter<any> = new EventEmitter<any>();
  loadingAsyncResponse: boolean = false;
  public formParent: FormGroup = new FormGroup({});
  errors: string[] = [];

  get controls(): any {
    return this.fieldConfigs.filter(
      (fieldConfig: FieldConfig) => fieldConfig && fieldConfig.type !== 'button'
    );
  }
  get changes() {
    return this.formParent.valueChanges;
  }
  get valid() {
    return this.formParent.valid;
  }
  get value() {
    return this.formParent.value;
  }
  get currentForm() {
    return this.formParent;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFormParent();
  }

  initFormParent(): void {
    if (this.formParent) {
      this.fieldConfigs.forEach((control) => {
        this.formParent.addControl('', this.createControl(control));
      });
      console.log(this.fieldConfigs);
      console.log("🚀 ~ file: dynamic-form.component.ts:53 ~ DynamicFormComponent ~ this.fieldConfigs.forEach ~ formParent:", this.formParent)
    }
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value, name } = config;
    return this.fb.control({ disabled, value, name }, validation);
  }

  handleSubmit(event: Event) {
    console.log(event, this.formParent);
    event.preventDefault();
    event.stopPropagation();
    if (this.formParent.valid) {
      this.resetAsyncFlags();
      this.onsubmit.emit({
        value: this.value,
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
  }
}

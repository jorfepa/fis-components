import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { FieldConfig } from './models/field-config.model';
import _ from 'lodash';

@Component({
  selector: 'fgeDynamicField',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  @Input() fieldConfigs: FieldConfig[] = [];
  @Input() formDataTypes: any[] = [];
  @Output() readonly onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly onCancel: EventEmitter<any> = new EventEmitter<any>();

  @ViewChildren('formField') refFormField: ElementRef;

  public formParent: FormGroup = new FormGroup({});

  fieldName = '';
  selectedDataType: any;
  dataTypes: any;

  constructor() {}

  ngOnInit(): void {
    this.dataTypes = this.formDataTypes.reduce((acc, item) => {
      acc[item.name.toLowerCase()] = item;
      return acc;
    }, {});
    this.initFormParent();
  }

  initFormParent(): void {
    let form = new FormGroup({});
    this.fieldConfigs.forEach((control) => {
      form.addControl(
        control.name,
        new FormControl(
          { value: control.value, disabled: control.disabled },
          control.validation?.validator
        )
      );
      if (!control.isStatic) {
        this.fieldName = control.name;
      }
    });
    this.formParent = form;
  }

  onDataTypeChange(ev: any) {
    this.selectedDataType = this.formDataTypes.find(
      (items) => items.name == ev.target.value
    );
    const selectedfield = this.fieldConfigs.find((field) => !field.isStatic);

    this.formParent.removeControl(this.fieldName);
    this.formParent.addControl(
      this.selectedDataType.name,
      new FormControl({ value: '', disabled: false }, [])
    );
    selectedfield.name = this.selectedDataType.name;
    selectedfield.type = this.selectedDataType.name;
    this.fieldName = this.selectedDataType.name;
    this.formParent.get(this.fieldName)?.addValidators(Validators.required);
    if (
      this.selectedDataType.validationPattern != null &&
      this.selectedDataType.name != this.dataTypes.date.name &&
      this.selectedDataType.name != this.dataTypes.boolean.name
    ) {
      this.formParent
        .get(this.fieldName)
        ?.addValidators(
          Validators.pattern(this.selectedDataType.validationPattern)
        );
    }

    if (this.dataTypes.color) {
      this.formParent.get(this.dataTypes.color.name).patchValue('ffffff');
    }

    setTimeout(() => {
      document.getElementById(this.fieldName)?.focus();
    }, 200);
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
  }

  public onChangeColor(color: string): void {
    this.formParent.get(this.selectedDataType.name).patchValue(color.slice(1));
  }

  handleSubmit() {
    if (this.formParent.valid) {
      this.onSubmit.emit(this.formParent.value);
    }
  }

  handleCancel() {
    this.onCancel.emit();
  }

  hasErrors(name) {
    return (
      !this.formParent.get(name).valid &&
      (this.formParent.get(name).dirty || this.formParent.get(name).touched)
    );
  }
}

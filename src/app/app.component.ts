import { Component } from '@angular/core';
import { FieldConfig } from './components/dynamic-form/models/field-config.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fieldConfigs: FieldConfig[] = [
    {
      disabled: false,
      label: 'label',
      name: 'name',
      options: ['opt1', 'opt2'],
      placeholder: 'placeholder',
      type: 'text',
      value: 'value1',
      src: 'scr',
      filename: 'filename',
      focus: false,
      validation: {
        val1: {
          errorMsg: 'errorMsg',
          validator: [Validators.required],
        },
      },
    },
    {
      disabled: true,
      label: 'label2_prueba',
      name: 'name2',
      options: ['opt1', 'opt2'],
      placeholder: 'placeholder2',
      type: 'text',
      value: 'value2',
      src: 'scr2',
      filename: 'filename2',
      focus: false,
      validation: {
        val1: {
          errorMsg: 'errorMsg',
          validator: [Validators.required],
        },
      },
    },
    {
      disabled: false,
      label: 'label3',
      name: 'name3',
      options: ['opt1', 'opt2'],
      placeholder: 'placeholder3',
      type: 'text',
      value: 'value3',
      src: 'scr3',
      filename: 'filename3',
      focus: false,
      validation: {
        val1: {
          errorMsg: 'errorMsg',
          validator: [Validators.required],
        },
      },
    },
  ];
}

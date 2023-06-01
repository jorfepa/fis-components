import { Component, OnInit } from '@angular/core';
import { FieldConfig } from './components/dynamic-form/models/field-config.model';
import { Validators } from '@angular/forms';

import settingsData from './settings.json';
import settingDataTypes from './dataTypes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dataTypes = settingDataTypes.data.items;
  types: string[] = [];

  ngOnInit(): void {
    settingDataTypes.data.items.forEach(type => {
        this.types.push(type.name);
    });
    /* this.data.forEach(element => {
      this.fieldConfigs.push({
        disabled: false,
        label: 'name',
        name: 'name',
        options: ['opt1', 'opt2'],
        placeholder: 'Name',
        type: 'text',
        value: 'value1',
        src: '',
        filename: '',
        focus: true,
        validation: {
          errorMsg: 'errorMsg',
          validator: [Validators.required],
        },
      });
    }); */
  }

  fieldConfigs: FieldConfig[] = [
    {
      disabled: false,
      label: 'Name',
      name: 'name',
      options: [],
      placeholder: 'Name',
      type: 'text',
      value: 'John Doe',
      src: '',
      filename: '',
      focus: true,
      validation: {
        errorMsg: 'errorMsg',
        validator: [Validators.required],
      },
    },
    {
      disabled: true,
      label: 'Description',
      name: 'description',
      options: [],
      placeholder: 'Description',
      type: 'text',
      value: '',
      src: '',
      filename: '',
      focus: false,
      validation: {
        errorMsg: 'errorMsg',
        validator: [Validators.required],
      },
    },
    {
      disabled: false,
      label: 'Data Type',
      name: 'dataType',
      options: this.types,
      placeholder: 'Choose data type',
      type: 'select',
      value: '',
      src: '',
      filename: '',
      focus: false,
      validation: {
        errorMsg: 'errorMsg',
        validator: [Validators.required],
      },
    },
  ];
}

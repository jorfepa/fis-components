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

  clickEditMenu() {
    console.log('Edit');
  }

  clickDeleteMenu() {
    console.log('Delete');
  }
  clickAddMenu() {
    console.log('Add');
  }

  ngOnInit(): void {
    settingDataTypes.data.items.forEach((type) => {
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

  submit(data: any) {
    console.log(data);
  }

  cancel() {
    console.log('Cancel');
  }

  fieldConfigs: FieldConfig[] = [
    {
      disabled: false,
      label: 'Name',
      name: 'name',
      options: [],
      placeholder: 'Name',
      type: 'String',
      value: 'John Doe',
      src: '',
      filename: '',
      focus: true,
      isStatic: true,
      validation: {
        errorMsg: 'Name is required',
        validator: [Validators.required],
      },
    },
    {
      disabled: false,
      label: 'Description',
      name: 'description',
      options: [],
      placeholder: 'Description',
      type: 'String',
      value: 'Description valu',
      src: '',
      filename: '',
      focus: false,
      isStatic: true,
      validation: {
        errorMsg: 'Description is required',
        validator: [Validators.required],
      },
    },
    {
      disabled: false,
      label: 'Data Type',
      name: 'dataType',
      options: this.types,
      placeholder: 'Choose data type',
      type: 'Select',
      value: 'String',
      src: '',
      filename: '',
      focus: false,
      isStatic: true,
      validation: {
        errorMsg: 'You must select a data type',
        validator: [],
      },
    },
    {
      disabled: false,
      label: 'Editor',
      name: 'String',
      options: [],
      placeholder: 'setting name',
      type: 'String',
      value: '',
      src: '',
      filename: '',
      focus: false,
      isStatic: false,
      validation: {
        errorMsg: 'Invalid data',
        validator: [Validators.required],
      },
    },
  ];
}

import { Component, OnInit } from '@angular/core';
import { FieldConfig } from './components/dynamic-form/models/field-config.model';
import { Validators } from '@angular/forms';

import settingDataTypes from './dataTypes.json';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DynamicFormComponent } from './components';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dataTypes = settingDataTypes.data.items;
  types: string[] = [];
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private toastr: ToastrService) {}

  clickEditMenu() {
    console.log('Edit');
    this.openModalWithComponent();
  }

  clickDeleteMenu() {
    console.log('Delete');
  }
  clickAddMenu() {
    console.log('Add');
    this.toastr.success('This is good');
    setTimeout(() => {
      this.toastr.info('This is good');      
    }, 1000);
    setTimeout(() => {
      this.toastr.warning('This is good');      
    }, 2000);
    setTimeout(() => {
      this.toastr.error('This is good');      
    }, 3000);
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Edit Group',
        formDataTypes: this.dataTypes,
        fieldConfigs: this.fieldConfigs,
      },
      class: 'right-modal',
    };
    this.bsModalRef = this.modalService.show(
      DynamicFormComponent,
      initialState
    );
    this.bsModalRef.content.onSubmit.subscribe((data) => {
      console.log(data);
      this.bsModalRef.hide();
    });
    this.bsModalRef.content.onClose.subscribe(() => {
      this.bsModalRef.hide();
    });
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
      label: 'Feature Name',
      name: 'name',
      options: [],
      placeholder: 'Feature Name',
      type: 'String',
      value: '',
      src: '',
      filename: '',
      focus: true,
      isStatic: true,
      validation: {
        errorMsg: 'Feature Name is required',
        validator: [],
      },
    },
  ];
}

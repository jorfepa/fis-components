import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'e2e-crud-menu',
  templateUrl: './crud-menu.component.html',
  styleUrls: ['./crud-menu.component.scss']
})
export class CrudMenuComponent {
  @Input() menuType: string;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<any> = new EventEmitter();

  constructor() { }

}

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  @Input() updateSelecetdRoles = new EventEmitter();
  
  user:User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  updateRoles(){
    this.updateSelecetdRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}

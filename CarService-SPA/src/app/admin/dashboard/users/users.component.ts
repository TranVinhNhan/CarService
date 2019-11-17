import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../../admin.component.css']
})
export class UsersComponent implements OnInit {

  modalRef: BsModalRef;
  users: User[];
  user: User;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(next => {
      this.alertify.success('Delete completed');
      this.loadUsers();
    }, error => {
      this.alertify.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalWithDeleteComponent(user: User) {
    const initialState = {
      title: 'Confirm Delete',
      user,
      users: this.users
    };
    this.modalRef = this.modalService.show(ModalUserDeleteComponent, { initialState });
  }
  openModalWithDetailComponent(user: User) {
    const initialState = {
      title: 'User Detail',
      user,
      users: this.users
    };
    this.modalRef = this.modalService.show(ModalUserDetailComponent, { initialState });
  }
}

//#region Modal delete component
@Component({
  selector: 'app-modal-delete',
  templateUrl: './_template/modal-delete.html'
})
export class ModalUserDeleteComponent implements OnInit {
  title: string;
  user: User;
  users: User[];

  constructor(
    public modalRef: BsModalRef,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() { }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(next => {
      this.alertify.success('Delete completed');
      this.modalRef.hide();
      const index = this.users.indexOf(this.user, 0);
      if (index > -1) {
        this.users.splice(index, 1);
      }
      // this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['/admin/users']);
      // });
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion

//#region Modal detail component
@Component({
  selector: 'app-modal-detail',
  templateUrl: './_template/modal-detail.html'
})
export class ModalUserDetailComponent implements OnInit {
  title: string;
  user: User;
  userForEdit: User;
  users: User[];

  constructor(
    public modalRef: BsModalRef,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.userForEdit = Object.assign({}, this.user);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(next => {
      this.modalRef.hide();
      this.alertify.success('Delete completed');
    }, error => {
      this.alertify.error(error);
    });
  }

  saveChanges() {
    this.userService.updateUser(this.user.id, this.userForEdit).subscribe(next => {
      this.alertify.success('Updated successfully');
      this.modalRef.hide();
      const index = this.users.indexOf(this.user, 0);
      if (index > -1) {
        this.users[index] = this.userForEdit;
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}
//#endregion

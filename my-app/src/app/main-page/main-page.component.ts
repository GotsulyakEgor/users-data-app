import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  formValue: FormGroup | any;
  userModelObj: UserModel = new UserModel()
  appearAddForm = false
  appearEditForm = false
  users: any[] = [];

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: ['', Validators.required] ,
      name: ['', Validators.minLength(2)],
      username: ['', Validators.minLength(2)],
      email: ['', Validators.email],
      website: ['', Validators.minLength(2)],
    })

    this.getAllUsers();

  }


  getAllUsers() {
    this.httpService.getUsers().subscribe((data: any) => {
      this.users = data
    })
  }

  deleteUserClick(id: number) {
    if (confirm('Are you really want delete this user?')) {
      this.httpService.deleteUser(id).subscribe((response: any) => {
        this.getAllUsers();
      })

    } else {
      this.httpService.getUsers().subscribe((lists: any) => {
        this.users = lists
      })
    }
  }

  addUserClick() {
    this.userModelObj.id = this.formValue.value.id
    this.userModelObj.name = this.formValue.value.name
    this.userModelObj.username = this.formValue.value.username
    this.userModelObj.email = this.formValue.value.email
    this.userModelObj.website = this.formValue.value.website

    this.httpService.addUser(this.userModelObj)
      .subscribe(res => {
          console.log(res);
          alert('User added successfully');
          this.formValue.reset();
          this.getAllUsers();
          this.appearAddForm = !this.appearAddForm
        },
        err => {
          alert('something got wrong')
        })
  }

  editUserClick(row: any) {
    this.userModelObj.id = row.id;
    this.formValue.controls['id'].setValue(row.id)
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['username'].setValue(row.username)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['website'].setValue(row.website)
    this.appearEditForm = !this.appearEditForm
  }



  onUpdateUserClick() {
    this.userModelObj.id = this.formValue.value.id
    this.userModelObj.name = this.formValue.value.name
    this.userModelObj.username = this.formValue.value.username
    this.userModelObj.email = this.formValue.value.email
    this.userModelObj.website = this.formValue.value.website

    this.httpService.editUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
        alert("Updated successfully")
        this.formValue.reset();
        this.getAllUsers();
        this.appearEditForm = !this.appearEditForm
      },
        err => {
          alert('something got wrong')
        })
  }

  cancelUpdateUserClick() {
    this.formValue.reset();
    this.getAllUsers();
    this.appearEditForm = !this.appearEditForm
  }

}

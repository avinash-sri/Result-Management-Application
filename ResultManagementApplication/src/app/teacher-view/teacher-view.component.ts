import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  formValue !: FormGroup;
  studentData !: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.user.getUser()
      .subscribe(res => {
        this.studentData = res;
      })
  }

  deleteUser(row: any){
    this.user.deleteUser(row.id)
    .subscribe(res=>{
      alert("User Deleted:" + row.name);
      this.getAllUser();
    })
  }

  getRecordCount() {
    return this.studentData.length;
  }
  
  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
}

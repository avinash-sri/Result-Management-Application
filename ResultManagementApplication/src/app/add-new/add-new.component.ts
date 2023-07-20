import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  formValue !: FormGroup;
  studentData !: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private user: UsersService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      rollno: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      score: ['', Validators.required]
    })
    this.getAllUser();
  }

  get rollno() { return this.formValue.controls['rollno']; }

  get name() { return this.formValue.controls['name']; }

  get dob() { return this.formValue.controls['dob']; }

  get score() { return this.formValue.controls['score']; }

  postUserDetails() {
    if (this.checkduplicate(this.formValue.value.rollno)) {
      alert("Roll Number already exists!")
      this.formValue.reset();
      this.router.navigate(['teacherView'])
    }
    else {
      this.user.postUser(this.formValue.value)
        .subscribe(res => {
          console.log(res);
          alert("Student Added Successfully!!")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllUser();
        },
          err => {
            alert("Something wrong!!")
          })
    }
  }

  getAllUser() {
    this.user.getUser()
      .subscribe(res => {
        this.studentData = res;
      })
  }

  checkduplicate(rollno: number) {
    for (var i = 0; i < this.studentData.length; i++) {
      var obj = this.studentData[i];
      if (obj.rollno === rollno) {
        return true;
      }
    }
    return false;
  }
}

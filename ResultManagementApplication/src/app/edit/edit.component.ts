import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../shared/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formValue !: FormGroup;
  studentData !: any;

  constructor(private formBuilder: FormBuilder, private user: UsersService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id'])
    this.user.getCurrentData(this.router.snapshot.params['id'])
    .subscribe(res=>{
      console.log("res", res);
      this.formValue = this.formBuilder.group({
        rollno: res['rollno'],
        name: res['name'],
        dob: res['dob'],
        score: res['score']
      })
    })
  }

  get rollno() { return this.formValue.controls['rollno']; }

  get name() { return this.formValue.controls['name']; }

  get dob() { return this.formValue.controls['dob']; }

  get score() { return this.formValue.controls['score']; }

  updateUserDetails() {
    console.log(this.formValue.value);
    this.user.updateUser(this.formValue.value, this.router.snapshot.params['id'])
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })

  }

  getAllUser() {
    this.user.getUser()
      .subscribe(res => {
        this.studentData = res;
      })
  }

}

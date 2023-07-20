import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  formResult !: FormGroup;
  searchData !: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private user: UsersService) { }

  ngOnInit(): void {
    this.formResult = this.formBuilder.group({
      rollno: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  get rollno() { return this.formResult.controls['rollno']; }

  get name() { return this.formResult.controls['name']; }

  result() {
    this.http.get<any>("http://localhost:3000/posts")
      .subscribe(res => {
        const user = res.find((a: any) => {
          if (a.name === this.formResult.value.name && a.rollno === this.formResult.value.rollno) {
            this.searchData = a;
            return this.searchData;
          }
        });
        if (this.searchData) {
          console.log(this.searchData);
          this.user.emit<any>(this.searchData);
          this.router.navigate(['studentResult']);
        }
        else {
          alert("Result Not found")
        }
      }, err => alert("Something went wrong!"))
  }
}
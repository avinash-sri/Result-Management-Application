import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  loginForm !: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get email() { return this.loginForm.controls['email']; }

  get password() { return this.loginForm.controls['password']; }

  login() {
    this.http.get<any>("http://localhost:3000/loginTeachers")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        console.log(user);
        if (user) {
          alert("Login Success!");
          localStorage.setItem('password', this.loginForm.value.password);
          this.loginForm.reset();
          this.router.navigate(['teacherView']);
        }
        else {
          alert("User Not Found!")
        }
      }, err => {
        alert("Something went wrong!")
      })
  }

  backToHome() {
    this.router.navigate(['login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent implements OnInit {

  resultData !: any;

  constructor(private user: UsersService) { }

  ngOnInit(): void {
    this.user.on<any>().subscribe(
      data=>{
        this.resultData=data;
      }
    )
  }

}

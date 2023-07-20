import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { EditComponent } from './edit/edit.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/auth.guard';
import { StudentResultComponent } from './student-result/student-result.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'studentView', component: StudentViewComponent },
  { path: 'teacherLogin', component: TeacherLoginComponent },
  { path: 'teacherView', canActivate: [AuthGuard], component: TeacherViewComponent },
  { path: 'studentResult', component: StudentResultComponent },
  { path: 'addNew', component: AddNewComponent },
  { path: 'edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

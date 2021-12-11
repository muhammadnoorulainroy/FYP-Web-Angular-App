import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage/homepage.component';
import { LoginComponent } from './components/login/login/login.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuardGuard } from './auth_guard/auth-guard.guard';
import { VanTabComponent } from './components/van-tab/van-tab.component';
import { AddVanComponent } from './components/add-van/add-van.component';
import { AssignVanToDriverComponent } from './components/assign-van-to-driver/assign-van-to-driver.component';
import { AllVansComponent } from './components/all-vans/all-vans.component';
import { StudentsTabComponent } from './components/students-tab/students-tab.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AssignDriverToStudentComponent } from './components/assign-driver-to-student/assign-driver-to-student.component';
import { DriversTabComponent } from './components/drivers-tab/drivers-tab.component';
import { AllDriversComponent } from './components/all-drivers/all-drivers.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { ComplaintsTabComponent } from './components/complaints-tab/complaints-tab.component';
import { AllComplaintsComponent } from './components/all-complaints/all-complaints.component';
import { ViewVanTabComponent } from './components/view-van-tab/view-van-tab.component';
import { ViewVanDetailsComponent } from './components/view-van-details/view-van-details.component';
import { ViewAssignedDriverToVanComponent } from './components/view-assigned-driver-to-van/view-assigned-driver-to-van.component';
import { ViewStudentTabComponent } from './components/view-student-tab/view-student-tab.component';
import { ViewVanStudentDetailsComponent } from './components/view-van-student-details/view-van-student-details.component';
import { ViewAssignedDriverToStudentComponent } from './components/view-assigned-driver-to-student/view-assigned-driver-to-student.component';

const routes: Routes = [

  {
    path: '', component: LoginComponent, data: { title: 'Sign In' },
    children: [
      { path: 'signin', component: SigninComponent, data: { title: 'Sign In' } },
      { path: 'forgotpassword', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } }
    ]
  },
  {
    path: 'admin', canActivate: [AuthGuardGuard], component: DefaultComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'van', component: VanTabComponent, data: { title: 'Vans' },
        children: [
          { path: 'allvans', component: AllVansComponent, data: { title: 'Van Dashboard' } },
          { path: 'addvan', component: AddVanComponent, data: { title: 'Add New Van' } },
          { path: 'assignvan', component: AssignVanToDriverComponent, data: { title: 'Assign Driver' } },
        ]
      },
      {
        path: 'vandetails', component: ViewVanTabComponent, data: { title: 'Van Details' },
        children: [
          { path: 'viewvandetails', component: ViewVanDetailsComponent, data: { title: 'Van Details' } },
          { path: 'viewassigneddrivertovan', component: ViewAssignedDriverToVanComponent, data: { title: 'Assigned Driver Details' } },
        ]
      },
      {
        path: 'studentdetails', component: ViewStudentTabComponent, data: { title: 'Student Details' },
        children: [
          { path: 'viewassignedvantostudent', component: ViewVanStudentDetailsComponent, data: { title: 'Van Details' } },
          { path: 'viewassigneddrivertostudent', component: ViewAssignedDriverToStudentComponent, data: { title: 'Assigned Driver Details' } },
        ]
      },

      {
        path: 'students', component: StudentsTabComponent, data: { title: 'Students' },
        children: [
          { path: 'allstudents', component: AllStudentsComponent, data: { title: 'Student Dashboard' } },
          { path: 'addstudent', component: AddStudentComponent, data: { title: 'Add New Student' } },
          { path: 'assigndriver', component: AssignDriverToStudentComponent, data: { title: 'Assign Driver' } },
        ]
      },
      {
        path: 'drivers', component: DriversTabComponent, data: { title: 'Drivers' },
        children: [
          { path: 'alldrivers', component: AllDriversComponent, data: { title: 'Driver Dashboard' } },
          { path: 'adddriver', component: AddDriverComponent, data: { title: 'Add New Driver' } },
        ]
      },
      {
        path: 'complaints', component: ComplaintsTabComponent, data: { title: 'Complaints' },
        children: [
          { path: 'allcomplaints', component: AllComplaintsComponent, data: { title: 'Complaints Dashboard' } },
        ]
      },

      { path: 'home', component: HomepageComponent, data: { title: 'Dashboard' } },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage/homepage.component';
import { LoginComponent } from './components/login/login/login.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './components/login/auth.service';
import { LoadingServiceService } from './loading-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import { NetworkInterceptor } from './network.interceptor';
import { DefaultModule } from './layouts/default/default.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { VanTabComponent } from './components/van-tab/van-tab.component';
import { AddVanComponent } from './components/add-van/add-van.component';
import { AllVansComponent } from './components/all-vans/all-vans.component';
import { AssignVanToDriverComponent } from './components/assign-van-to-driver/assign-van-to-driver.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { StudentsTabComponent } from './components/students-tab/students-tab.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AssignDriverToStudentComponent } from './components/assign-driver-to-student/assign-driver-to-student.component'
import { MatNativeDateModule } from '@angular/material/core';
import { DriversTabComponent } from './components/drivers-tab/drivers-tab.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { AllDriversComponent } from './components/all-drivers/all-drivers.component';
import { ComplaintsTabComponent } from './components/complaints-tab/complaints-tab.component';
import { AllComplaintsComponent } from './components/all-complaints/all-complaints.component';
import { ComplaintFeedbackComponent } from './components/all-complaints/complaint-feedback/complaint-feedback.component';
import { ViewVanTabComponent } from './components/view-van-tab/view-van-tab.component';
import { ViewAssignedDriverToVanComponent } from './components/view-assigned-driver-to-van/view-assigned-driver-to-van.component';
import { ViewVanDetailsComponent } from './components/view-van-details/view-van-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SigninComponent,
    ForgotPasswordComponent,
    VanTabComponent,
    AddVanComponent,
    AllVansComponent,
    AssignVanToDriverComponent,
    StudentsTabComponent,
    AllStudentsComponent,
    AddStudentComponent,
    AssignDriverToStudentComponent,
    DriversTabComponent,
    AddDriverComponent,
    AllDriversComponent,
    ComplaintsTabComponent,
    AllComplaintsComponent,
    ComplaintFeedbackComponent,
    ViewVanTabComponent,
    ViewAssignedDriverToVanComponent,
    ViewVanDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    DefaultModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, LoadingServiceService, {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[AssignVanToDriverComponent,AssignDriverToStudentComponent, ComplaintFeedbackComponent]
})
export class AppModule { }

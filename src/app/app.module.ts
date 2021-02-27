import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectComponent } from './project/project.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TaskComponent } from './task/task.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { FormTaskComponent } from './form-task/form-task.component';
import { FormUserComponent } from './form-user/form-user.component';
import { MainWindowComponent } from './main-window/main-window.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { FormClientComponent } from './form-client/form-client.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ClientsService } from './services/clients.service';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling'
import "firebase/auth";
import "firebase/firestore";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListProjectsComponent,
    ProjectComponent,
    ListTasksComponent,
    TaskComponent,
    FormProjectComponent,
    FormTaskComponent,
    FormUserComponent,
    MainWindowComponent,
    ListClientsComponent,
    ClientComponent,
    DashboardComponent,
    ProjectBoardComponent,
    FormClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ClientsService
  ],
  bootstrap: [AppComponent],
  entryComponents:[FormClientComponent]
  
})
export class AppModule { 
  
}

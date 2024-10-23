import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { AutomationListComponent } from './components/automation-list/automation-list.component';
import { AutomationFormComponent } from './components/automation-form/automation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    UserListComponent,
    TeamListComponent,
    PropertyListComponent,
    DocumentListComponent,
    CompanyListComponent,
    AutomationListComponent,
    AutomationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

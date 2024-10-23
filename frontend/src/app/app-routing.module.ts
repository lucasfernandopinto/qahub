import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { AutomationListComponent } from './components/automation-list/automation-list.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'properties', component: PropertyListComponent },
  { path: 'documents', component: DocumentListComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: 'automations', component: AutomationListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

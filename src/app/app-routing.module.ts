import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';
import { AuthComponent } from './auth/auth.component';
import { MainWindowComponent} from './main-window/main-window.component'
import { AdminWindowComponent} from './admin-window/admin-window.component'
import { ModifUserComponent} from './modif-user/modif-user.component'
import { SearchUserComponent} from './search-user/search-user.component'
import { AuthGuardService } from './services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { ProjectBoardComponent } from'./project-board/project-board.component'
import { InfoUserComponent } from './info-user/info-user.component';
import{TaskComponent} from './task/task.component'

const routes: Routes = [
 { path: 'main-window',canActivate: [AuthGuardService], component: MainWindowComponent },
 { path: 'main-window/infos-user',canActivate: [AuthGuardService], component: InfoUserComponent }, 
 { path: 'main-window/admin',canActivate: [AuthGuardService], component: AdminWindowComponent }, 
 { path: 'auth',component: AuthComponent },
 { path: 'users/search',canActivate: [AuthGuardService], component: SearchUserComponent },
 { path: 'users/new',canActivate: [AuthGuardService], component: FormUserComponent },
 { path: 'user-modif/:id',canActivate: [AuthGuardService], component: ModifUserComponent },
 { path: 'project', component: ProjectBoardComponent},
 { path: 'task', component: TaskComponent},
 { path: '', component: AuthComponent},
 { path: '', redirectTo: 'main-window', pathMatch: 'full' },
 { path: '**', redirectTo: 'main-window' }
];
export const appRouting = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

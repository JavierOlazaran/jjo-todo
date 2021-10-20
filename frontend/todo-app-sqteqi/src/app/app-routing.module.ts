import { appRoutes } from './routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: appRoutes.TODO_LIST, pathMatch: 'full'},
  {
    path: appRoutes.TODO_LIST,
    loadChildren: () => import('./pages/todo-list-page/todo-list-page.module')
    .then(m => m.TodoListModule),
    canActivate: [LoggedGuard],
    canLoad: [LoggedGuard]
  },
  {
    path: appRoutes.ERROR,
    loadChildren: () => import('./pages/error/error.module')
    .then(m => m.ErrorModule)
  },
  {
    path: appRoutes.LOGIN,
    loadChildren: () => import('./pages/login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path: appRoutes.NOT_FOUND,
    loadChildren: () => import('./pages/not-found/not-found.module')
    .then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

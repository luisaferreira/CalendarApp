import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./Paginas/tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'cadastro', loadChildren: () => import('./Paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  { path: 'login', loadChildren: () => import('./Paginas/login/login.module').then( m => m.LoginPageModule)}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
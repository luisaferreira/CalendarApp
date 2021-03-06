import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./Paginas/tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'cadastro', loadChildren: () => import('./Paginas/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  { path: 'login', loadChildren: () => import('./Paginas/login/login.module').then( m => m.LoginPageModule)},
  { path: 'configuracoes', loadChildren: () => import('./Paginas/configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)},
  { path: 'new-email', loadChildren: () => import('./Paginas/new-email/new-email.module').then( m => m.NewEmailPageModule)},
  { path: 'new-senha', loadChildren: () => import('./Paginas/new-senha/new-senha.module').then( m => m.NewSenhaPageModule)},
  { path: 'excluir-conta', loadChildren: () => import('./Paginas/excluir-conta/excluir-conta.module').then( m => m.ExcluirContaPageModule)},
  { path: 'detalhesevento/:id', loadChildren: () => import('./Paginas/detalhesevento/detalhesevento.module').then( m => m.DetalheseventoPageModule)},
  { path: 'perfilalheio/:id', loadChildren: () => import('./Paginas/perfilalheio/perfilalheio.module').then( m => m.PerfilalheioPageModule)},
  { path: 'lista-usuarios', loadChildren: () => import('./Paginas/lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule)},
  {
    path: 'comentario',
    loadChildren: () => import('./Paginas/comentario/comentario.module').then( m => m.ComentarioPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

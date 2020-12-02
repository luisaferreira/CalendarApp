import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilalheioPage } from './perfilalheio.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilalheioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilalheioPageRoutingModule {}

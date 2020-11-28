import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendModalPage } from './calend-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CalendModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendModalPageRoutingModule {}

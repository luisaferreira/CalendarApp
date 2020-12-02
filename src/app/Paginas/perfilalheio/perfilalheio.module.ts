import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilalheioPageRoutingModule } from './perfilalheio-routing.module';

import { PerfilalheioPage } from './perfilalheio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilalheioPageRoutingModule
  ],
  declarations: [PerfilalheioPage]
})
export class PerfilalheioPageModule {}

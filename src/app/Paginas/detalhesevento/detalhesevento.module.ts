import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheseventoPageRoutingModule } from './detalhesevento-routing.module';

import { DetalheseventoPage } from './detalhesevento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheseventoPageRoutingModule
  ],
  declarations: [DetalheseventoPage]
})
export class DetalheseventoPageModule {}

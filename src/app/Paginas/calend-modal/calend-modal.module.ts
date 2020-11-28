import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendModalPageRoutingModule } from './calend-modal-routing.module';

import { CalendModalPage } from './calend-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendModalPageRoutingModule
  ],
  declarations: [CalendModalPage]
})
export class CalendModalPageModule {}

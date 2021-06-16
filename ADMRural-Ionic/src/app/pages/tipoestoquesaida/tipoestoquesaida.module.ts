import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipoestoquesaidaPage } from './tipoestoquesaida.page';

const routes: Routes = [
  {
    path: '',
    component: TipoestoquesaidaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipoestoquesaidaPage]
})
export class TipoestoquesaidaPageModule {}

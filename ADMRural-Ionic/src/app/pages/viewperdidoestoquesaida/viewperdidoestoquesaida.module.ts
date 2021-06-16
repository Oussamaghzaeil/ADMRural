import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewperdidoestoquesaidaPage } from './viewperdidoestoquesaida.page';

const routes: Routes = [
  {
    path: '',
    component: ViewperdidoestoquesaidaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewperdidoestoquesaidaPage]
})
export class ViewperdidoestoquesaidaPageModule {}

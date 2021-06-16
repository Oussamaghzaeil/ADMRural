import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmorteestoquesaidaPage } from './viewmorteestoquesaida.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmorteestoquesaidaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewmorteestoquesaidaPage]
})
export class ViewmorteestoquesaidaPageModule {}

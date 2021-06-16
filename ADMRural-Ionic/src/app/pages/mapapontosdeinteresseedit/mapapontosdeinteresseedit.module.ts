import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapapontosdeinteresseeditPage } from './mapapontosdeinteresseedit.page';

const routes: Routes = [
  {
    path: '',
    component: MapapontosdeinteresseeditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapapontosdeinteresseeditPage]
})
export class MapapontosdeinteresseeditPageModule {}

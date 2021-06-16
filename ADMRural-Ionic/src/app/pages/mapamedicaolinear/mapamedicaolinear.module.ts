import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapamedicaolinearPage } from './mapamedicaolinear.page';

const routes: Routes = [
  {
    path: '',
    component: MapamedicaolinearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapamedicaolinearPage]
})
export class MapamedicaolinearPageModule {}

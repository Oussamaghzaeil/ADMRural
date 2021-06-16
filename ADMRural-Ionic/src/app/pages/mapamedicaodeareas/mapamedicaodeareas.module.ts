import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapamedicaodeareasPage } from './mapamedicaodeareas.page';

const routes: Routes = [
  {
    path: '',
    component: MapamedicaodeareasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapamedicaodeareasPage]
})
export class MapamedicaodeareasPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SaidastockaliPage } from './saidastockali.page';

const routes: Routes = [
  {
    path: '',
    component: SaidastockaliPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaidastockaliPage]
})
export class SaidastockaliPageModule {}

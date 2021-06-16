import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovotipoalimPage } from './novotipoalim.page';

const routes: Routes = [
  {
    path: '',
    component: NovotipoalimPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovotipoalimPage]
})
export class NovotipoalimPageModule {}

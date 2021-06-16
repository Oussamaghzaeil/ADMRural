import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicaolinearinPage } from './medicaolinearin.page';

const routes: Routes = [
  {
    path: '',
    component: MedicaolinearinPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MedicaolinearinPage]
})
export class MedicaolinearinPageModule {}

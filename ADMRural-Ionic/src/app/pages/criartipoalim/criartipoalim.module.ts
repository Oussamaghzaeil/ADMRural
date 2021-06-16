import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CriartipoalimPage } from './criartipoalim.page';

const routes: Routes = [
  {
    path: '',
    component: CriartipoalimPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CriartipoalimPage]
})
export class CriartipoalimPageModule {}

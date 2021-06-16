import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditpontosdeinteressePage } from './editpontosdeinteresse.page';

const routes: Routes = [
  {
    path: '',
    component: EditpontosdeinteressePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditpontosdeinteressePage]
})
export class EditpontosdeinteressePageModule {}

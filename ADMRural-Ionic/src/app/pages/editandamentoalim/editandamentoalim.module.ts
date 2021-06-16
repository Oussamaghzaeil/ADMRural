import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditandamentoalimPage } from './editandamentoalim.page';

const routes: Routes = [
  {
    path: '',
    component: EditandamentoalimPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditandamentoalimPage]
})
export class EditandamentoalimPageModule {}

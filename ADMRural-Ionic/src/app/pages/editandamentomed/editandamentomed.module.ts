import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditandamentomedPage } from './editandamentomed.page';

const routes: Routes = [
  {
    path: '',
    component: EditandamentomedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditandamentomedPage]
})
export class EditandamentomedPageModule {}

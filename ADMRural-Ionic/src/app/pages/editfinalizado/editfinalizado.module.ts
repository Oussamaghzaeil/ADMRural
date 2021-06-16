import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditfinalizadoPage } from './editfinalizado.page';

const routes: Routes = [
  {
    path: '',
    component: EditfinalizadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditfinalizadoPage]
})
export class EditfinalizadoPageModule {}

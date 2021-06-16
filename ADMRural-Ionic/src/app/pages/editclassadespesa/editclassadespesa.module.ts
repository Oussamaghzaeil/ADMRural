import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditclassadespesaPage } from './editclassadespesa.page';

const routes: Routes = [
  {
    path: '',
    component: EditclassadespesaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditclassadespesaPage]
})
export class EditclassadespesaPageModule {}

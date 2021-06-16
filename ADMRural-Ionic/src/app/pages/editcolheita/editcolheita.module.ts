import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditcolheitaPage } from './editcolheita.page';

const routes: Routes = [
  {
    path: '',
    component: EditcolheitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditcolheitaPage]
})
export class EditcolheitaPageModule {}

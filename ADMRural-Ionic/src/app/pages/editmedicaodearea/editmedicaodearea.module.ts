import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditmedicaodeareaPage } from './editmedicaodearea.page';

const routes: Routes = [
  {
    path: '',
    component: EditmedicaodeareaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditmedicaodeareaPage]
})
export class EditmedicaodeareaPageModule {}

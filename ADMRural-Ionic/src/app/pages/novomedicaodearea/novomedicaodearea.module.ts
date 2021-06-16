import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovomedicaodeareaPage } from './novomedicaodearea.page';

const routes: Routes = [
  {
    path: '',
    component: NovomedicaodeareaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovomedicaodeareaPage]
})
export class NovomedicaodeareaPageModule {}

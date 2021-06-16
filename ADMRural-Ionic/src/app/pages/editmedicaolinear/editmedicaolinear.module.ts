import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditmedicaolinearPage } from './editmedicaolinear.page';

const routes: Routes = [
  {
    path: '',
    component: EditmedicaolinearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditmedicaolinearPage]
})
export class EditmedicaolinearPageModule {}

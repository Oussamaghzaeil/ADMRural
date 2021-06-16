import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovomedicaolinearPage } from './novomedicaolinear.page';

const routes: Routes = [
  {
    path: '',
    component: NovomedicaolinearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovomedicaolinearPage]
})
export class NovomedicaolinearPageModule {}

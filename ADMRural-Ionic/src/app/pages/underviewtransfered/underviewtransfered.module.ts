import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnderviewtransferedPage } from './underviewtransfered.page';

const routes: Routes = [
  {
    path: '',
    component: UnderviewtransferedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnderviewtransferedPage]
})
export class UnderviewtransferedPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimaiscoletivoPage } from './animaiscoletivo.page';

const routes: Routes = [
  {
    path: '',
    component: AnimaiscoletivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnimaiscoletivoPage]
})
export class AnimaiscoletivoPageModule {}

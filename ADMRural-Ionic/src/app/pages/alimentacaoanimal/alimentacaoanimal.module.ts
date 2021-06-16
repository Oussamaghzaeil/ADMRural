import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlimentacaoanimalPage } from './alimentacaoanimal.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentacaoanimalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlimentacaoanimalPage]
})
export class AlimentacaoanimalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaitemsaidaoutroPage } from './novaitemsaidaoutro.page';

const routes: Routes = [
  {
    path: '',
    component: NovaitemsaidaoutroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaitemsaidaoutroPage]
})
export class NovaitemsaidaoutroPageModule {}

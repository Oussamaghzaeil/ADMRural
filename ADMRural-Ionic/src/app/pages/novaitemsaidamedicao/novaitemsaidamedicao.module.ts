import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaitemsaidamedicaoPage } from './novaitemsaidamedicao.page';

const routes: Routes = [
  {
    path: '',
    component: NovaitemsaidamedicaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaitemsaidamedicaoPage]
})
export class NovaitemsaidamedicaoPageModule {}

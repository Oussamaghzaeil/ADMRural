import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnotacoesListPage } from './anotacoes-list.page';

const routes: Routes = [
  {
    path: '',
    component: AnotacoesListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnotacoesListPage]
})
export class AnotacoesListPageModule {}

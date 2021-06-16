import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaclassedespPage } from './novaclassedesp.page';

const routes: Routes = [
  {
    path: '',
    component: NovaclassedespPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaclassedespPage]
})
export class NovaclassedespPageModule {}

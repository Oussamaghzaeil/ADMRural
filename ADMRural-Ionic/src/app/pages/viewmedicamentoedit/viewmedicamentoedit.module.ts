import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmedicamentoeditPage } from './viewmedicamentoedit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmedicamentoeditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewmedicamentoeditPage]
})
export class ViewmedicamentoeditPageModule {}

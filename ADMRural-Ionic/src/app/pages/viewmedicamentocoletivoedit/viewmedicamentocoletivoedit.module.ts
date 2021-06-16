import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmedicamentocoletivoeditPage } from './viewmedicamentocoletivoedit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmedicamentocoletivoeditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewmedicamentocoletivoeditPage]
})
export class ViewmedicamentocoletivoeditPageModule {}

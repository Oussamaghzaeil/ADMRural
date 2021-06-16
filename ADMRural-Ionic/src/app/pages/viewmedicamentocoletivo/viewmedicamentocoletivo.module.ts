import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewmedicamentocoletivoPage } from './viewmedicamentocoletivo.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmedicamentocoletivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewmedicamentocoletivoPage]
})
export class ViewmedicamentocoletivoPageModule {}

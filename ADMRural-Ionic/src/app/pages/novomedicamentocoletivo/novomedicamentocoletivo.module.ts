import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovomedicamentocoletivoPage } from './novomedicamentocoletivo.page';

const routes: Routes = [
  {
    path: '',
    component: NovomedicamentocoletivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovomedicamentocoletivoPage]
})
export class NovomedicamentocoletivoPageModule {}

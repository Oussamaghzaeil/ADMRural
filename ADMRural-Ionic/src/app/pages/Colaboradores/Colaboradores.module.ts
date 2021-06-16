import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ColaboradoresPage } from './Colaboradores.page';

const routes: Routes = [
  {
    path: '',
    component: ColaboradoresPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColaboradoresPage]
})
export class ColaboradoresPageModule {}




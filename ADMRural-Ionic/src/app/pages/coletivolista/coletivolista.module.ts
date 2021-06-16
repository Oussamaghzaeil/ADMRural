import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ColetivolistaPage } from './coletivolista.page';

const routes: Routes = [
  {
    path: '',
    component: ColetivolistaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColetivolistaPage]
})
export class ColetivolistaPageModule {}

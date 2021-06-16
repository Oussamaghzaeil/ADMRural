import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransferanciacoletivolistaPage } from './transferanciacoletivolista.page';

const routes: Routes = [
  {
    path: '',
    component: TransferanciacoletivolistaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransferanciacoletivolistaPage]
})
export class TransferanciacoletivolistaPageModule {}

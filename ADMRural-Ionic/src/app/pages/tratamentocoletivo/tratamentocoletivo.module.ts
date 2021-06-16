import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TratamentocoletivoPage } from './tratamentocoletivo.page';

const routes: Routes = [
  {
    path: '',
    component: TratamentocoletivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TratamentocoletivoPage]
})
export class TratamentocoletivoPageModule {}

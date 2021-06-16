import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovocolheitaPage } from './novocolheita.page';

const routes: Routes = [
  {
    path: '',
    component: NovocolheitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovocolheitaPage]
})
export class NovocolheitaPageModule {}

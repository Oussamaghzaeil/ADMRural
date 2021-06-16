import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovotipoOutrosaidaPage } from './novotipo-outrosaida.page';

const routes: Routes = [
  {
    path: '',
    component: NovotipoOutrosaidaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovotipoOutrosaidaPage]
})
export class NovotipoOutrosaidaPageModule {}

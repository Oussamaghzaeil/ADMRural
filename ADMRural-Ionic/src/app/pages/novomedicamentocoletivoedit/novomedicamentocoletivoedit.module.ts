import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovomedicamentocoletivoeditPage } from './novomedicamentocoletivoedit.page';

const routes: Routes = [
  {
    path: '',
    component: NovomedicamentocoletivoeditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovomedicamentocoletivoeditPage]
})
export class NovomedicamentocoletivoeditPageModule {}

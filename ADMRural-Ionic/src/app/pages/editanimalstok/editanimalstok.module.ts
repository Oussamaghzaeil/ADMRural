import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditanimalstokPage } from './editanimalstok.page';

const routes: Routes = [
  {
    path: '',
    component: EditanimalstokPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditanimalstokPage]
})
export class EditanimalstokPageModule {}

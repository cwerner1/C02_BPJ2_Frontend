import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreisvergleichPage } from './preisvergleich.page';

const routes: Routes = [
  {
    path: '',
    component: PreisvergleichPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreisvergleichPage]
})
export class PreisvergleichPageModule {}

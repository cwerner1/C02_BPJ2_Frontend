import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InseratPage } from './inserat.page';

const routes: Routes = [
  {
    path: '',
    component: InseratPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule
  ],
  declarations: [InseratPage]
})
export class InseratPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import { PlacesRoutingModule } from './places-routing-module';

@NgModule({
  imports: [
    CommonModule,
    PlacesRoutingModule,
    IonicModule,
    PlacesPageRoutingModule
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}

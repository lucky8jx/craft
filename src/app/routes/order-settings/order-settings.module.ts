import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSettingsRoutingModule } from './order-settings-routing.module';
import { MaterialComponent } from './material/material.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModalComponent } from './material/material-modal/material-modal.component';
import { ColourAtlaComponent } from './colour-atla/colour-atla.component';
import { ColourAtlaModalComponent } from './colour-atla/colour-atla-modal/colour-atla-modal.component';
import { FactoryComponent } from './factory/factory.component';
import { StoreComponent } from './store/store.component';
import { StoreModalComponent } from './store/store-modal/store-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrderSettingsRoutingModule
  ],
  declarations: [
    MaterialComponent, MaterialModalComponent,
    ColourAtlaComponent, ColourAtlaModalComponent,
    FactoryComponent, StoreComponent, StoreModalComponent
  ],
  entryComponents: [
    MaterialModalComponent, ColourAtlaModalComponent,
    StoreModalComponent,
  ]
})
export class OrderSettingsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSettingsRoutingModule } from './order-settings-routing.module';
import { MaterialComponent } from './material/material.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModalComponent } from './material/material-modal/material-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrderSettingsRoutingModule
  ],
  declarations: [MaterialComponent, MaterialModalComponent],
  entryComponents: [
    MaterialModalComponent,
  ]
})
export class OrderSettingsModule { }

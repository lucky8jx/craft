import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { OrganizationSettingsRoutingModule } from './organization-settings-routing.module';
import { AccountComponent } from './account/account.component';
import { AccountModalComponent } from './account/account-modal/account-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OrganizationSettingsRoutingModule
  ],
  declarations: [AccountComponent, AccountModalComponent],
  entryComponents: [
    AccountModalComponent
  ]
})
export class OrganizationSettingsModule { }

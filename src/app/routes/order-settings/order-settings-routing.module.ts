import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from './material/material.component';
import { ColourAtlaComponent } from './colour-atla/colour-atla.component';
import { FactoryComponent } from './factory/factory.component';

const routes: Routes = [
    { path: 'material', component: MaterialComponent },
    { path: 'colour-atla', component: ColourAtlaComponent },
    { path: 'factory', component: FactoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSettingsRoutingModule { }

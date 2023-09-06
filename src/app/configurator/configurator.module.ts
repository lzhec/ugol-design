import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorComponent } from './configurator.component';
import { ConfiguratorRoutingModule } from './configurator-routing.module';

@NgModule({
  declarations: [ConfiguratorComponent],
  imports: [CommonModule, ConfiguratorRoutingModule],
})
export class ConfiguratorModule {}

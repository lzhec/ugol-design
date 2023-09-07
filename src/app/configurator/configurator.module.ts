import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { ConfiguratorComponent } from './configurator.component';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { LeftMenuModule } from './modules/left-menu/left-menu.module';
import { CommonState } from 'app/store/global.state';
import { LeftMenuState } from 'app/store/common-state/left-menu-state/left-menu.state';
import { ConfiguratorInterceptor } from 'app/interceptors/interceptor.service';

@NgModule({
  declarations: [ConfiguratorComponent],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    LeftMenuModule,
    NgxsModule.forRoot([CommonState, LeftMenuState]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConfiguratorInterceptor,
      multi: true,
    },
  ],
})
export class ConfiguratorModule {}

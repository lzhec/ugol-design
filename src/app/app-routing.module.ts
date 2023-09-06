import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  {
    path: '',
    component: EmptyRouteComponent,
  },
  {
    path: 'login',
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
  },
  {
    path: 'configurator',
    loadChildren: async () =>
      (await import('./configurator/configurator.module')).ConfiguratorModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

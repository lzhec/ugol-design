import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorComponent } from './configurator.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguratorComponent,
  },
  {
    path: 'flat',
    loadChildren: () =>
      import('./modules/my-flat-page/my-flat-page.module').then(
        (m) => m.MyFlatPageModule
      ),
  },
  {
    path: 'materials',
    loadChildren: () =>
      import('./modules/list-of-works-page/list-of-works-page.module').then(
        (m) => m.ListOfWorksPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguratorRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { ListOfWorksPageComponent } from './list-of-works-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListOfWorksPageComponent,
  },
];

@NgModule({
  declarations: [ListOfWorksPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TabViewModule],
})
export class ListOfWorksPageModule {}

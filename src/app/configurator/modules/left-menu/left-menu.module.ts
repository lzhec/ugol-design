import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LeftMenuComponent } from './left-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { LeftMenuFacade } from 'app/store/common-state/left-menu-state/left-menu.facade';

@NgModule({
  declarations: [LeftMenuComponent, MenuItemComponent],
  exports: [LeftMenuComponent],
  imports: [CommonModule, RouterLinkActive, RouterLink],
  providers: [LeftMenuFacade],
})
export class LeftMenuModule {}

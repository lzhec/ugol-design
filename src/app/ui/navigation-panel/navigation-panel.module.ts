import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NavigationPanelComponent } from './navigation-panel.component';
import { AccountNavComponent } from './account-nav/account-nav.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  declarations: [NavigationPanelComponent, AccountNavComponent],
  exports: [NavigationPanelComponent],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    MatMenuModule,
    OverlayPanelModule,
    RouterLinkActive,
    SvgModule,
  ],
})
export class NavigationPanelModule {}

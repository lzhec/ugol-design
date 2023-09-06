import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'configurator-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input()
  public link: string = '';

  @Input()
  public icon: string = '';

  @Input()
  public title: string = '';

  @Input()
  public active: boolean = false;

  @Input()
  public additionalRows = undefined;

  public href: string = '';

  constructor(private router: Router) {}
}

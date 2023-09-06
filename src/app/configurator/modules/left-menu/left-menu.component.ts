import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  leftPanelApartment,
  leftPanelCalculate,
  leftPanelOptions,
} from '@shared/types/left-panel';
import { LeftMenuFacade } from 'app/store/common-state/left-menu-state/left-menu.facade';

@Component({
  selector: 'configurator-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent {
  public leftMenuInfo$: any;

  public apartmentInfo: any;
  public optionsInfo: any;
  public calculateInfo: any;
  constructor(private router: Router, public LeftMenuFacade: LeftMenuFacade) {
    this.LeftMenuFacade;
    this.leftMenuInfo$ = this.LeftMenuFacade.leftPanelInfo$;
  }
  public navigateToFlat(): void {
    this.router.navigate(['configurator/flat']);
  }

  public navigateToMaterialsPage() {
    this.router.navigate(['configurator/materials']);
  }
}

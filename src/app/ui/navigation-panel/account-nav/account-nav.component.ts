import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'container-account-nav',
  templateUrl: './account-nav.component.html',
  styleUrls: ['./account-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountNavComponent {
  public showMenu = false;

  public toggleAccountNav(): void {
    this.showMenu = !this.showMenu;
  }
}

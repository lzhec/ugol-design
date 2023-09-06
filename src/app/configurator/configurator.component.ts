import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorComponent {}

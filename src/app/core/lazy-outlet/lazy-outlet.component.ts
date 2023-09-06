import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ReplaySubject } from 'rxjs';
import { LazyComponent } from '../core.types';
import { loadLazyComponent } from '../dynamic-load';
import { LazyErrorDirective } from '../lazy-error/lazy-error.directive';
import { LazyProgressDirective } from '../lazy-progress/lazy-progress.directive';
import { OutletDirective } from '../outlet/outlet.directive';

@Component({
  selector: 'app-lazy-outlet',
  templateUrl: './lazy-outlet.component.html',
  styleUrls: ['./lazy-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('lazyInProgressState', [
      state('void', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('void => visible', animate('600ms ease-in')),
      transition('visible => void', animate('0ms ease-out')),
    ]),
    trigger('visibleState', [
      state('invisible', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('invisible => visible', animate('300ms ease-in')),
    ]),
  ],
  host: {
    class: 'app-lazy-outlet',
  },
})
export class LazyOutletComponent implements OnChanges {
  @Input() public lazyComponent: LazyComponent;
  @Input() public showProgress: boolean = true;
  @Input() public showError: boolean = true;

  @ViewChild(OutletDirective, { static: true }) private outlet: OutletDirective;

  @ContentChild(LazyProgressDirective, { read: TemplateRef })
  public progressTemplate: TemplateRef<any>;

  @ContentChild(LazyErrorDirective, { read: TemplateRef })
  public errorTemplate: TemplateRef<any>;

  public lazyComponentLoading$ = new ReplaySubject<boolean>(1);
  public lazyComponentLoadingError$ = new ReplaySubject<boolean>(1);
  public _visibleState = 'invisible';

  constructor(private cd: ChangeDetectorRef) {}

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (
      changes['lazyComponent'].currentValue &&
      changes['lazyComponent'].previousValue !==
        changes['lazyComponent'].currentValue
    ) {
      this.outlet.removeComponent();

      this.lazyComponentLoading$.next(true);

      try {
        const { component, injector } = await loadLazyComponent(
          this.lazyComponent.factory,
          this.lazyComponent.injector
        );
        this.lazyComponentLoading$.next(false);

        this.outlet.createComponent(component, injector);
        this._visibleState = 'visible';
        this.cd.detectChanges();
      } catch (e) {
        console.log(
          `%cLazyOutlet, Error: ${e.message}\n${e.stack}`,
          'color: red'
        );

        this.lazyComponentLoading$.next(false);
        this.lazyComponentLoadingError$.next(true);
      }
    }
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { BaseObject } from '@shared/base/base-object';
import { SvgService } from './svg.service';

@Component({
  selector: 'app-svg',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-svg',
    '[class.app-svg-fill]': 'type === "fill"',
    '[class.app-svg-stroke]': 'type === "stroke"',
    '[class.app-svg-skeleton]': 'type === "skeleton"',
    '[class.--inverse]': 'type && type !== "none" && subType === "inverse"',
    '[class.--static]': 'type && type !== "none" && subType === "static"',
    '[class.--danger]': 'type && type !== "none" && subType === "danger"',
    '[class.--warning]': 'type && type !== "none" && subType === "warning"',
    '[class.--success]': 'type && type !== "none" && subType === "success"',
    '[class.--success-blue]':
      'type && type !== "none" && subType === "success-blue"',
    '[class.--link]': 'type && type !== "none" && subType === "link"',
    '[class.--disabled]': 'disabled',
    '[class.--disabled-hover]': 'disabledHover',
  },
})
export class SvgComponent extends BaseObject implements OnChanges {
  @Input() public src: string;
  @Input() public type: 'fill' | 'stroke' | 'skeleton' | 'none' = 'fill';
  @Input() public subType:
    | 'inverse'
    | 'static'
    | 'danger'
    | 'warning'
    | 'success'
    | 'success-blue'
    | 'link' = null;
  @Input() public disabled: boolean;
  @Input() public disabledHover: boolean;

  public ready$ = new Subject<SVGElement>();
  public loading$ = new Subject<boolean>();

  private currentSvgNode: Node;

  constructor(
    public el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private svgService: SvgService
  ) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['src'] &&
      changes['src'].currentValue !== changes['src'].previousValue
    ) {
      this.ready$.next(null);
      this.loading$.next(true);

      this.svgService
        .get(this.src)
        .pipe(take(1), takeUntil(this.destroy$))
        .subscribe((svg) => {
          this.setSvg(svg);
          this.loading$.next(false);
        });
    }
  }

  private setSvg(svg: SVGElement): void {
    if (!svg) {
      throw new Error(`SvgComponent: file ${this.src} is not available`);
    }

    if (this.currentSvgNode) {
      this.renderer.removeChild(this.el.nativeElement, this.currentSvgNode);
    }

    this.currentSvgNode = svg.cloneNode(true);

    this.renderer.appendChild(this.el.nativeElement, this.currentSvgNode);
    this.cd.detectChanges();

    this.ready$.next(this.currentSvgNode as SVGElement);
  }
}


import {
  Component,
  ElementRef,
  Renderer2,
  Attribute,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GridComponent } from './grid.component';
import { TilePadding } from './grid.types';
import { GridService } from './grid.service';

export type AlignType = 'center' | 'left' | 'right' | 'top' | 'bottom';
export type DisplayType = 'row' | 'column';

@Component({
  selector: 'app-grid-tile',
  template: '<ng-content></ng-content>',
  styleUrls: [],
  host: {
    class: 'app-grid-tile',
    '[style.--colspan]': 'colspan',
  },
})
export class GridTileComponent implements OnChanges {
  /**
   * Whether or not to show elements that protrude beyond the border of the tile
   */
  @Input() public showOverflow: boolean = false;

  /**
   * The count of columns a cell occupies
   */
  @Input() public colspan: number = 1;

  /**
   * Cell flag with empty content if you need to display a stub instead of content
   */
  @Input() public blank: boolean = false;

  @HostBinding('style.overflow')
  public get overflowStyle(): 'hidden' | 'visible' {
    return this.showOverflow ? 'visible' : 'hidden';
  }

  private _selfPadding: TilePadding;

  constructor(
    /** Align cell content horizontally and vertically */
    @Attribute('contentAlign') public contentAlign: string = null,
    /** Cell content drawing direction */
    @Attribute('display') public contentDisplay: DisplayType = null,
    /** Self padding size inside grid cell */
    @Attribute('selfPadding') public selfPadding: string = null,
    private el: ElementRef,
    private r: Renderer2,
    private grid: GridComponent,
    private gridService: GridService
  ) {
    this.colspan = this.colspan || 1;
    this.contentAlign = this.contentAlign || 'left top';
    this.contentDisplay = this.contentDisplay || 'column';
    this._selfPadding = this.selfPadding
      ? this.gridService.toTilePadding(this.selfPadding)
      : null;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['colspan'] &&
      changes['colspan'].previousValue &&
      changes['colspan'].previousValue !== changes['colspan'].currentValue
    ) {
      this.grid.setGridItemsStyles();
    }
  }

  /**
   * Dynamically sets grid cell sizes.
   * @param rowHeight Grid line height
   * @param tilePadding Padding size inside grid cell
   */
  public setStyles(rowHeight: number, tilePadding: TilePadding): void {
    if (rowHeight) {
      this.r.setStyle(this.el.nativeElement, 'max-height', `${rowHeight}px`);
      this.r.setStyle(this.el.nativeElement, 'min-height', `${rowHeight}px`);
    }

    const _tilePadding: TilePadding = this._selfPadding
      ? this._selfPadding
      : tilePadding;

    if (_tilePadding.top) {
      this.r.setStyle(
        this.el.nativeElement,
        'padding-top',
        `${_tilePadding.top}px`
      );
    }

    if (_tilePadding.bottom) {
      this.r.setStyle(
        this.el.nativeElement,
        'padding-bottom',
        `${_tilePadding.bottom}px`
      );
    }

    if (_tilePadding.left) {
      this.r.setStyle(
        this.el.nativeElement,
        'padding-left',
        `${_tilePadding.left}px`
      );
    }

    if (_tilePadding.right) {
      this.r.setStyle(
        this.el.nativeElement,
        'padding-right',
        `${_tilePadding.right}px`
      );
    }

    this.setContentDisplay();
    this.setContentAlign();
  }

  /**
   * Specifies the drawing rule for the cell content
   */
  private setContentDisplay(): void {
    switch (this.contentDisplay) {
      case 'row':
        this.r.setStyle(this.el.nativeElement, 'flex-direction', 'row');
        break;

      case 'column':
        this.r.setStyle(this.el.nativeElement, 'flex-direction', 'column');
        break;

      default:
        throw new Error('Error: app-grid-tile input "display" incorrect value');
    }
  }

  /**
   * Aligns the content of the cell
   */
  private setContentAlign(): void {
    const contentAlign = this.contentAlign.trim();

    if (!contentAlign.length) {
      throw new Error(
        'Error: app-grid-tile input "contentAlign" should not be empty'
      );
    }

    const aligns = contentAlign.split(' ').map((align) => align.trim());

    if (aligns.length > 2) {
      throw new Error(
        'Error: app-grid-tile input "contentAlign" incorrect value'
      );
    }

    let horizontalAlign: AlignType;

    switch (aligns[0]) {
      case 'left':
      case 'right':
      case 'center':
        horizontalAlign = aligns[0] as AlignType;
        break;

      default:
        throw new Error(
          'Error: app-grid-tile input "contentAlign" incorrect horizontal value'
        );
    }

    let verticalAlign: AlignType;

    if (aligns[1]) {
      switch (aligns[1]) {
        case 'top':
        case 'bottom':
        case 'center':
          verticalAlign = aligns[1] as AlignType;
          break;

        default:
          throw new Error(
            'Error: app-grid-tile input "contentAlign" incorrect vertical value'
          );
      }
    } else {
      verticalAlign = 'top';
    }

    switch (this.contentDisplay) {
      case 'row': {
        switch (horizontalAlign) {
          case 'left':
            this.r.setStyle(
              this.el.nativeElement,
              'justify-content',
              'flex-start'
            );
            break;
          case 'right':
            this.r.setStyle(
              this.el.nativeElement,
              'justify-content',
              'flex-end'
            );
            break;
          case 'center':
            this.r.setStyle(this.el.nativeElement, 'justify-content', 'center');
            break;
        }

        switch (verticalAlign) {
          case 'top':
            this.r.setStyle(this.el.nativeElement, 'align-items', 'flex-start');
            break;
          case 'bottom':
            this.r.setStyle(this.el.nativeElement, 'align-items', 'flex-end');
            break;
          case 'center':
            this.r.setStyle(this.el.nativeElement, 'align-items', 'center');
            break;
        }

        break;
      }

      case 'column': {
        switch (horizontalAlign) {
          case 'left':
            this.r.setStyle(this.el.nativeElement, 'align-items', 'flex-start');
            break;
          case 'right':
            this.r.setStyle(this.el.nativeElement, 'align-items', 'flex-end');
            break;
          case 'center':
            this.r.setStyle(this.el.nativeElement, 'align-items', 'center');
            break;
        }

        switch (verticalAlign) {
          case 'top':
            this.r.setStyle(
              this.el.nativeElement,
              'justify-content',
              'flex-start'
            );
            break;
          case 'bottom':
            this.r.setStyle(
              this.el.nativeElement,
              'justify-content',
              'flex-end'
            );
            break;
          case 'center':
            this.r.setStyle(this.el.nativeElement, 'justify-content', 'center');
            break;
        }

        break;
      }
    }
  }
}

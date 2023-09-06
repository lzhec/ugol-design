import {
  AfterContentInit,
  Attribute,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GapType } from './grid.types';
import { GridService } from './grid.service';
import { GridTileComponent } from './grid-tile.component';

@Component({
  selector: 'app-grid',
  template: `
    <div class="app-grid__body">
      <ng-content select="app-grid-tile"></ng-content>
    </div>
  `,
  styleUrls: [],
  host: {
    class: 'app-grid',
    '[class.--breakpoints-enable]': 'breakpointsEnable',
    '[style.--gap]': 'gap',
    '[style.--cols]': 'cols',
  },
})
export class GridComponent implements AfterContentInit, OnChanges, OnDestroy {
  /**
   * Count of grid columns
   */
  @Input() public cols: number = 1;

  /**
   * padding size between grid cells
   */
  @Input() public gap: string = null;

  /**
   * padding type between grid cells
   */
  @Input()
  public set gapType(value: GapType) {
    this._gapType = value;
  }

  public get gapType(): GapType {
    return this._gapType;
  }

  /**
   * Flag for grid adaptability
   */
  @Input() public breakpointsEnable = true;

  @HostBinding('class')
  public get gapTypeClass(): string {
    return `--${this.gapType}-gap`;
  }

  /**
   * List of grid items from content projection
   */
  @ContentChildren(GridTileComponent)
  private tiles: QueryList<GridTileComponent>;

  private _gapType: GapType = 'inner';

  private destroy$: Subject<void> = new Subject();

  constructor(
    /**
     * Grid row height
     */
    @Attribute('rowHeight') public rowHeight: string = null,
    /**
     * Padding size inside grid cell
     */
    @Attribute('tilePadding') public tilePadding: string = null,
    public el: ElementRef<HTMLElement>,
    private gridService: GridService
  ) {}

  public ngAfterContentInit(): void {
    this.setGridItemsStyles();

    this.tiles.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.setGridItemsStyles());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['cols'] &&
      changes['cols'].previousValue &&
      changes['cols'].previousValue !== changes['cols'].currentValue
    ) {
      if (!this.cols) {
        throw new Error('Error: app-grid input "cols" should be set');
      }

      this.setGridItemsStyles();
    }

    if (
      changes['breakpointsEnable'] &&
      (changes['breakpointsEnable'].currentValue === undefined ||
        changes['breakpointsEnable'].currentValue === null)
    ) {
      this.breakpointsEnable = true;
    }
  }

  /**
   * Dynamically sets cell sizes
   */
  public setGridItemsStyles(): void {
    this.tiles.forEach((tile: GridTileComponent) =>
      tile.setStyles(
        this.gridService.toNumber(this.rowHeight),
        this.gridService.toTilePadding(this.tilePadding)
      )
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

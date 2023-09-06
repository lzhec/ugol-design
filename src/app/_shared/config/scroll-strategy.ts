import { ScrollStrategy } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { AppInjector } from '../config/app-injector';

export class AppScrollStrategy implements ScrollStrategy {
  private readonly SCROLL_STRATEGY_CLASS = 'app-scroll-strategy';

  private document: Document;
  private bodyHasClassBeforeAttach: boolean = false;

  constructor() {
    this.document = AppInjector.Injector.get(DOCUMENT);
  }

  public attach(): void {
    this.bodyHasClassBeforeAttach = this.bodyHasClass;
  }

  public enable(): void {
    if (!this.bodyHasClassBeforeAttach) {
      this.document.body.classList.add(this.SCROLL_STRATEGY_CLASS);
    }
  }

  public disable(): void {
    if (!this.bodyHasClassBeforeAttach) {
      this.document.body.classList.remove(this.SCROLL_STRATEGY_CLASS);
    }
  }

  private get bodyHasClass(): boolean {
    return this.document.body.classList.contains(this.SCROLL_STRATEGY_CLASS);
  }
}

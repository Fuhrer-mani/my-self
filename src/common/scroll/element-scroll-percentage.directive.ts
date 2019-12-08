import { Directive, Output } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementScrollPercentageService } from './element-scroll-percentage.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[scrollPercentage]'
})
export class ElementScrollPercentageDirective implements OnInit, OnDestroy {

  @Output() public scrollPercentage: EventEmitter<number> = new EventEmitter();
  @Output() public isScrollDown: EventEmitter<boolean> = new EventEmitter();

  public subscription: Subscription;
  private elementRef: ElementRef;
  private elementScrollPercentage: ElementScrollPercentageService;
  private oldScrollPosition = 0;

  constructor(
    elementRef: ElementRef,
    elementScrollPercentage: ElementScrollPercentageService) {
    this.elementRef = elementRef;
    this.elementScrollPercentage = elementScrollPercentage;
  }

  // ---
  // PUBLIC METHODS.
  // ---

  // I get called once when the directive is being unmounted.
  public ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }


  // I get called once after the inputs have been bound for the first time.
  public ngOnInit(): void {

    // The purpose of the directive is to act as the GLUE between the element scroll
    // service and the host element for this directive. Let's subscribe to the scroll
    // events and then pipe them into the output event for this directive.
    this.subscription = this.elementScrollPercentage
      .getScrollAsStream(this.elementRef.nativeElement)
      .subscribe(
        (percent: number): void => {
          this.scrollPercentage.next(percent);
          this.getScrollUpOrDown(percent);
          this.oldScrollPosition = percent;
        }
      );
  }

  getScrollUpOrDown(newScrollPosition) {
    this.isScrollDown.emit(this.oldScrollPosition < newScrollPosition);
  }

}

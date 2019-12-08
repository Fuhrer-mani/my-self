import { Component, OnInit, HostListener, Renderer2, ElementRef, Inject } from '@angular/core';
import { ElementScrollPercentageService } from '@common/scroll/element-scroll-percentage.service';
import { range } from 'lodash';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import { fromEvent, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-demo-scroll-usage',
  templateUrl: './demo-scroll-usage.component.html',
  styleUrls: ['./demo-scroll-usage.component.scss'],
  providers: [ElementScrollPercentageService]
})
export class DemoScrollUsageComponent implements OnInit {

  elementScrollPercentage: ElementScrollPercentageService;
  demoRange: number[] = [];
  active: number = 0;

  constructor(elementScrollPercentage: ElementScrollPercentageService,
              private renderer: Renderer2,
              private el: ElementRef,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
    this.elementScrollPercentage = elementScrollPercentage;
  }

  // @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    console.log('ff', event);
    if (event.wheelDelta < 0) {
      this.active = this.active + 1;
      this.active = Math.min(this.active, this.demoRange.length - 1);
    } else {
      this.active = this.active - 1;
      this.active = Math.max(this.active, 0);
    }
    if (event.preventDefault) {
    event.preventDefault();
    }
    event.returnValue = false;
    console.log(this.active);
    timer(1).subscribe(() => {
      this.pageScrollService.scroll({
        document: this.document,
        scrollTarget: '.extra',
        speed: 1000
      });
    });
  }

  ngOnInit() {
    this.demoRange = range(15);
    // document.addEventListener('wheel', this.onWindowScroll, {passive: false});
    fromEvent(document, 'wheel', {passive: false})
    // .pipe(debounceTime(100))
    .subscribe((event) => {
      this.onWindowScroll(event);
    });
    // this.elementScrollPercentage.getScrollUpOrDown()
    //   .subscribe((dd) => {
    //     console.log(dd);
        
    //     if (dd) {
    //       this.active = this.active + 1;
    //       this.active = Math.min(this.active, this.demoRange.length);
    //     } else {
    //       this.active = this.active - 1;
    //       this.active = Math.max(this.active, 0);
    //     }


    //     console.log(this.active);
    //     this.pageScrollService.scroll({
    //       document: this.document,
    //       scrollTarget: '.extra',
    //       // speed: 1000
    //     });
        // this.elementScrollPercentage.getScrollAsStream()
        // .subscribe((dd) => {
        //  this.active = Math.floor((dd * (this.demoRange.length * 16)) / 1600);
        //  console.log(this.active);
        //  this.pageScrollService.scroll({
        //   document: this.document,
        //   scrollTarget: '.extra',
        //   speed: 1000
        // });
        //  window.scrollTo(0, this.active  * 16);
        // });
      // });
  }

}

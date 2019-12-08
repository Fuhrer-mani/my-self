import { Component, OnInit } from '@angular/core';
import { ElementScrollPercentageService } from '../element-scroll-percentage.service';
import { range } from 'lodash';

@Component({
  selector: 'app-demo-scroll',
  templateUrl: './demo-scroll.component.html',
  styleUrls: ['./demo-scroll.component.scss']
})
export class DemoScrollComponent implements OnInit {

  public demoRange: number[];
  public innerScroll: number;
  public pageScroll: number;
  elementScrollPercentage: ElementScrollPercentageService;

  constructor(elementScrollPercentage: ElementScrollPercentageService) {
    this.elementScrollPercentage = elementScrollPercentage;
  }

  public ngOnInit(): void {
    this.elementScrollPercentage
      .getScrollAsStream() // Defaults to Document if no Element supplied.
      .subscribe(
        (percent: number): void => {

          this.pageScroll = percent;

        }
      );
    this.demoRange = range(15);
  }


  // I record the element scroll percentage of the inner content area, applying it
  // to the inner status bar.
  public recordInnerScroll(percent: number): void {

    this.innerScroll = percent;

  }

  isScrollDown(event) {
  }

}

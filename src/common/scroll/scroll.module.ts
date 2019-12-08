import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementScrollPercentageDirective } from './element-scroll-percentage.directive';
import { DemoScrollComponent } from './demo-scroll/demo-scroll.component';
import { DemoScrollUsageComponent } from './demo-scroll/demo-scroll-usage/demo-scroll-usage.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';


@NgModule({
  declarations: [
    ElementScrollPercentageDirective,
    DemoScrollComponent,
    DemoScrollUsageComponent
  ],
  imports: [
    CommonModule,
    NgxPageScrollCoreModule.forRoot({duration: 1000})
  ],
  exports: [
    ElementScrollPercentageDirective,
    DemoScrollComponent,
    DemoScrollUsageComponent,
    NgxPageScrollCoreModule
  ]
})
export class ScrollModule { }

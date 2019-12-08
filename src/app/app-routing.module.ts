import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoScrollComponent } from '@common/scroll/demo-scroll/demo-scroll.component';
import { DemoScrollUsageComponent } from '@common/scroll/demo-scroll/demo-scroll-usage/demo-scroll-usage.component';


const routes: Routes = [
  {
    path: 'scroll',
    component: DemoScrollComponent
  },
  {
    path: 'scroll-usage',
    component: DemoScrollUsageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

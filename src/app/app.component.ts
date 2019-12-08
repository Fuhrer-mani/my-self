import { Component, OnInit } from '@angular/core';
import { ElementScrollPercentageService } from '@common/scroll/element-scroll-percentage.service';
import { range } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-self';

  ngOnInit() {}

}


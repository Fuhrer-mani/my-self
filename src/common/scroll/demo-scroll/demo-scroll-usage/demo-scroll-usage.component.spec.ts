import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoScrollUsageComponent } from './demo-scroll-usage.component';

describe('DemoScrollUsageComponent', () => {
  let component: DemoScrollUsageComponent;
  let fixture: ComponentFixture<DemoScrollUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoScrollUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoScrollUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoScrollComponent } from './demo-scroll.component';

describe('DemoScrollComponent', () => {
  let component: DemoScrollComponent;
  let fixture: ComponentFixture<DemoScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

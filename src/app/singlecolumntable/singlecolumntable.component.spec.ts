import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecolumntableComponent } from './singlecolumntable.component';

describe('SinglecolumntableComponent', () => {
  let component: SinglecolumntableComponent;
  let fixture: ComponentFixture<SinglecolumntableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglecolumntableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecolumntableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

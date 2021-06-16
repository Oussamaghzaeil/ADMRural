import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtransferedPage } from './viewtransfered.page';

describe('ViewtransferedPage', () => {
  let component: ViewtransferedPage;
  let fixture: ComponentFixture<ViewtransferedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtransferedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtransferedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

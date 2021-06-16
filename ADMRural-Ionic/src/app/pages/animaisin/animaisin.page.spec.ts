import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaisinPage } from './animaisin.page';

describe('AnimaisinPage', () => {
  let component: AnimaisinPage;
  let fixture: ComponentFixture<AnimaisinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimaisinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaisinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

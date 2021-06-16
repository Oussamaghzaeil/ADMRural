import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmortePage } from './viewmorte.page';

describe('ViewmortePage', () => {
  let component: ViewmortePage;
  let fixture: ComponentFixture<ViewmortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

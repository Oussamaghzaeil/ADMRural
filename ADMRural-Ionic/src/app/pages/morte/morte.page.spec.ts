import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortePage } from './morte.page';

describe('MortePage', () => {
  let component: MortePage;
  let fixture: ComponentFixture<MortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

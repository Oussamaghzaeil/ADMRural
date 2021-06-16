import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidastockoutroPage } from './saidastockoutro.page';

describe('SaidastockoutroPage', () => {
  let component: SaidastockoutroPage;
  let fixture: ComponentFixture<SaidastockoutroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidastockoutroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidastockoutroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoberturaPage } from './viewcobertura.page';

describe('ViewcoberturaPage', () => {
  let component: ViewcoberturaPage;
  let fixture: ComponentFixture<ViewcoberturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcoberturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcoberturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

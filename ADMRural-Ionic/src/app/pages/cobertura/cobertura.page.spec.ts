import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaPage } from './cobertura.page';

describe('CoberturaPage', () => {
  let component: CoberturaPage;
  let fixture: ComponentFixture<CoberturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoberturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoberturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

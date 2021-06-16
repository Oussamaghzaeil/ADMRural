import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoletivotratamentoPage } from './viewcoletivotratamento.page';

describe('ViewcoletivotratamentoPage', () => {
  let component: ViewcoletivotratamentoPage;
  let fixture: ComponentFixture<ViewcoletivotratamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcoletivotratamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcoletivotratamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

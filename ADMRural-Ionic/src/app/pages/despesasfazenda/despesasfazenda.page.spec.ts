import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesasfazendaPage } from './despesasfazenda.page';

describe('DespesasfazendaPage', () => {
  let component: DespesasfazendaPage;
  let fixture: ComponentFixture<DespesasfazendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespesasfazendaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespesasfazendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

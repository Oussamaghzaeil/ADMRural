import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaestoqueanimaisvendidosPage } from './saidaestoqueanimaisvendidos.page';

describe('SaidaestoqueanimaisvendidosPage', () => {
  let component: SaidaestoqueanimaisvendidosPage;
  let fixture: ComponentFixture<SaidaestoqueanimaisvendidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaestoqueanimaisvendidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaestoqueanimaisvendidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

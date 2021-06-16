import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaestoqueanimaisperdidosPage } from './saidaestoqueanimaisperdidos.page';

describe('SaidaestoqueanimaisperdidosPage', () => {
  let component: SaidaestoqueanimaisperdidosPage;
  let fixture: ComponentFixture<SaidaestoqueanimaisperdidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaestoqueanimaisperdidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaestoqueanimaisperdidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

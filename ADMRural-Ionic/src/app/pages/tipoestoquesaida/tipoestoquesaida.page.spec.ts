import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoestoquesaidaPage } from './tipoestoquesaida.page';

describe('TipoestoquesaidaPage', () => {
  let component: TipoestoquesaidaPage;
  let fixture: ComponentFixture<TipoestoquesaidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoestoquesaidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoestoquesaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

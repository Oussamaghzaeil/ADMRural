import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacadomedicamentoColetivoPage } from './aplicacadomedicamento-coletivo.page';

describe('AplicacadomedicamentoColetivoPage', () => {
  let component: AplicacadomedicamentoColetivoPage;
  let fixture: ComponentFixture<AplicacadomedicamentoColetivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacadomedicamentoColetivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacadomedicamentoColetivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

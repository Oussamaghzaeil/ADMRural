import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacaomedicamentocoletivoPage } from './aplicacaomedicamentocoletivo.page';

describe('AplicacaomedicamentocoletivoPage', () => {
  let component: AplicacaomedicamentocoletivoPage;
  let fixture: ComponentFixture<AplicacaomedicamentocoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacaomedicamentocoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacaomedicamentocoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

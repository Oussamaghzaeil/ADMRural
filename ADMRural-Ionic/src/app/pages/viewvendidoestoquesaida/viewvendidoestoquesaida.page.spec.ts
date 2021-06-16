import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewvendidoestoquesaidaPage } from './viewvendidoestoquesaida.page';

describe('ViewvendidoestoquesaidaPage', () => {
  let component: ViewvendidoestoquesaidaPage;
  let fixture: ComponentFixture<ViewvendidoestoquesaidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewvendidoestoquesaidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewvendidoestoquesaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

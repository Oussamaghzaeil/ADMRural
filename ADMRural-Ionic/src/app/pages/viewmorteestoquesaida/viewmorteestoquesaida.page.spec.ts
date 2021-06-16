import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmorteestoquesaidaPage } from './viewmorteestoquesaida.page';

describe('ViewmorteestoquesaidaPage', () => {
  let component: ViewmorteestoquesaidaPage;
  let fixture: ComponentFixture<ViewmorteestoquesaidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmorteestoquesaidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmorteestoquesaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockfinalizadoPage } from './stockfinalizado.page';

describe('StockfinalizadoPage', () => {
  let component: StockfinalizadoPage;
  let fixture: ComponentFixture<StockfinalizadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockfinalizadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockfinalizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

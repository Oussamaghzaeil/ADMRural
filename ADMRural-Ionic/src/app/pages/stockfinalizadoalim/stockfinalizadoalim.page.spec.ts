import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockfinalizadoalimPage } from './stockfinalizadoalim.page';

describe('StockfinalizadoalimPage', () => {
  let component: StockfinalizadoalimPage;
  let fixture: ComponentFixture<StockfinalizadoalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockfinalizadoalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockfinalizadoalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

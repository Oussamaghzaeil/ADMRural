import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockanimaisPage } from './stockanimais.page';

describe('StockanimaisPage', () => {
  let component: StockanimaisPage;
  let fixture: ComponentFixture<StockanimaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockanimaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockanimaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

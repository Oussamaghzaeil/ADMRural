import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockfinalizadomedPage } from './stockfinalizadomed.page';

describe('StockfinalizadomedPage', () => {
  let component: StockfinalizadomedPage;
  let fixture: ComponentFixture<StockfinalizadomedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockfinalizadomedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockfinalizadomedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

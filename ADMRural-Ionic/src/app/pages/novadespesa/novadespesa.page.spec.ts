import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovadespesaPage } from './novadespesa.page';

describe('NovadespesaPage', () => {
  let component: NovadespesaPage;
  let fixture: ComponentFixture<NovadespesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovadespesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovadespesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

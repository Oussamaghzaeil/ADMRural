import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdespesasPage } from './editdespesas.page';

describe('EditdespesasPage', () => {
  let component: EditdespesasPage;
  let fixture: ComponentFixture<EditdespesasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdespesasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdespesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

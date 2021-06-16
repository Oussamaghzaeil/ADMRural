import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclassadespesaPage } from './editclassadespesa.page';

describe('EditclassadespesaPage', () => {
  let component: EditclassadespesaPage;
  let fixture: ComponentFixture<EditclassadespesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclassadespesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclassadespesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

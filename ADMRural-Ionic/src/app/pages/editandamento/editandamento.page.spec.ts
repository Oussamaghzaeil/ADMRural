import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditandamentoPage } from './editandamento.page';

describe('EditandamentoPage', () => {
  let component: EditandamentoPage;
  let fixture: ComponentFixture<EditandamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditandamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditandamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

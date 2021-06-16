import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditandamentomedPage } from './editandamentomed.page';

describe('EditandamentomedPage', () => {
  let component: EditandamentomedPage;
  let fixture: ComponentFixture<EditandamentomedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditandamentomedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditandamentomedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

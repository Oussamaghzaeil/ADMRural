import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditandamentoalimPage } from './editandamentoalim.page';

describe('EditandamentoalimPage', () => {
  let component: EditandamentoalimPage;
  let fixture: ComponentFixture<EditandamentoalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditandamentoalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditandamentoalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

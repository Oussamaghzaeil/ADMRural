import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfinalizadoalimPage } from './editfinalizadoalim.page';

describe('EditfinalizadoalimPage', () => {
  let component: EditfinalizadoalimPage;
  let fixture: ComponentFixture<EditfinalizadoalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfinalizadoalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfinalizadoalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

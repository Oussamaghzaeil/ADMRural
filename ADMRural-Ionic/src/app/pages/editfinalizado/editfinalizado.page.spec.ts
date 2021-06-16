import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfinalizadoPage } from './editfinalizado.page';

describe('EditfinalizadoPage', () => {
  let component: EditfinalizadoPage;
  let fixture: ComponentFixture<EditfinalizadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfinalizadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfinalizadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

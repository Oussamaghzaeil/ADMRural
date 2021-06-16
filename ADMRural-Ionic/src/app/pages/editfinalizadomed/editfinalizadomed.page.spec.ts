import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfinalizadomedPage } from './editfinalizadomed.page';

describe('EditfinalizadomedPage', () => {
  let component: EditfinalizadomedPage;
  let fixture: ComponentFixture<EditfinalizadomedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfinalizadomedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfinalizadomedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

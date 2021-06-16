import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpontosdeinteressePage } from './editpontosdeinteresse.page';

describe('EditpontosdeinteressePage', () => {
  let component: EditpontosdeinteressePage;
  let fixture: ComponentFixture<EditpontosdeinteressePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpontosdeinteressePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpontosdeinteressePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

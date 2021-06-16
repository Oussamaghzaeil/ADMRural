import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmapamedicaodeareasPage } from './editmapamedicaodeareas.page';

describe('EditmapamedicaodeareasPage', () => {
  let component: EditmapamedicaodeareasPage;
  let fixture: ComponentFixture<EditmapamedicaodeareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmapamedicaodeareasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmapamedicaodeareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

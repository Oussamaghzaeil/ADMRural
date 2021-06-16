import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcolheitaPage } from './editcolheita.page';

describe('EditcolheitaPage', () => {
  let component: EditcolheitaPage;
  let fixture: ComponentFixture<EditcolheitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcolheitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcolheitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

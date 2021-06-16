import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfazendaPage } from './editfazenda.page';

describe('EditfazendaPage', () => {
  let component: EditfazendaPage;
  let fixture: ComponentFixture<EditfazendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfazendaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfazendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

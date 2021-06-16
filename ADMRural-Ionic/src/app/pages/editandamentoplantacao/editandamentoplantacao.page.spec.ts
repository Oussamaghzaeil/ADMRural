import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditandamentoplantacaoPage } from './editandamentoplantacao.page';

describe('EditandamentoplantacaoPage', () => {
  let component: EditandamentoplantacaoPage;
  let fixture: ComponentFixture<EditandamentoplantacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditandamentoplantacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditandamentoplantacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

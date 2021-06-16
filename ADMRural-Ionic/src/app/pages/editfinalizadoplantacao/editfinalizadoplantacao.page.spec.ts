import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfinalizadoplantacaoPage } from './editfinalizadoplantacao.page';

describe('EditfinalizadoplantacaoPage', () => {
  let component: EditfinalizadoplantacaoPage;
  let fixture: ComponentFixture<EditfinalizadoplantacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfinalizadoplantacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfinalizadoplantacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoplantacaoPage } from './novoplantacao.page';

describe('NovoplantacaoPage', () => {
  let component: NovoplantacaoPage;
  let fixture: ComponentFixture<NovoplantacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoplantacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoplantacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

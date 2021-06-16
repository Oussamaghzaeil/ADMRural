import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentacaoPage } from './alimentacao.page';

describe('AlimentacaoPage', () => {
  let component: AlimentacaoPage;
  let fixture: ComponentFixture<AlimentacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

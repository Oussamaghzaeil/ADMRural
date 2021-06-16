import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacoesListPage } from './anotacoes-list.page';

describe('AnotacoesListPage', () => {
  let component: AnotacoesListPage;
  let fixture: ComponentFixture<AnotacoesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotacoesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacoesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

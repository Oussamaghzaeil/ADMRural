import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacoesPage } from './anotacoes.page';

describe('AnotacoesPage', () => {
  let component: AnotacoesPage;
  let fixture: ComponentFixture<AnotacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

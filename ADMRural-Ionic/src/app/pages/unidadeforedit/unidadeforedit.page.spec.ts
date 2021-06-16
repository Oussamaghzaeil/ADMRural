import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeforeditPage } from './unidadeforedit.page';

describe('UnidadeforeditPage', () => {
  let component: UnidadeforeditPage;
  let fixture: ComponentFixture<UnidadeforeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeforeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeforeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

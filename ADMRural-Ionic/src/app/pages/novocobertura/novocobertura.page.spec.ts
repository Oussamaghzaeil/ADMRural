import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovocoberturaPage } from './novocobertura.page';

describe('NovocoberturaPage', () => {
  let component: NovocoberturaPage;
  let fixture: ComponentFixture<NovocoberturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovocoberturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovocoberturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

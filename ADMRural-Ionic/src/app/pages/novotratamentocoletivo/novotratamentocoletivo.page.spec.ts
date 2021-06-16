import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotratamentocoletivoPage } from './novotratamentocoletivo.page';

describe('NovotratamentocoletivoPage', () => {
  let component: NovotratamentocoletivoPage;
  let fixture: ComponentFixture<NovotratamentocoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotratamentocoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotratamentocoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

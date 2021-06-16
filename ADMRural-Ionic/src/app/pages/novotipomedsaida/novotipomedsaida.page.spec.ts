import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotipomedsaidaPage } from './novotipomedsaida.page';

describe('NovotipomedsaidaPage', () => {
  let component: NovotipomedsaidaPage;
  let fixture: ComponentFixture<NovotipomedsaidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotipomedsaidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotipomedsaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

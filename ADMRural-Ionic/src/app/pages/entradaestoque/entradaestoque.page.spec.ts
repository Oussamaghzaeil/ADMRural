import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaestoquePage } from './entradaestoque.page';

describe('EntradaestoquePage', () => {
  let component: EntradaestoquePage;
  let fixture: ComponentFixture<EntradaestoquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaestoquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaestoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

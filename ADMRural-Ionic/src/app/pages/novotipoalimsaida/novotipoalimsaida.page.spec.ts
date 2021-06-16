import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotipoalimsaidaPage } from './novotipoalimsaida.page';

describe('NovotipoalimsaidaPage', () => {
  let component: NovotipoalimsaidaPage;
  let fixture: ComponentFixture<NovotipoalimsaidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotipoalimsaidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotipoalimsaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

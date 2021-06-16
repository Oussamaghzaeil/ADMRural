import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotipoOutrosaidaPage } from './novotipo-outrosaida.page';

describe('NovotipoOutrosaidaPage', () => {
  let component: NovotipoOutrosaidaPage;
  let fixture: ComponentFixture<NovotipoOutrosaidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotipoOutrosaidaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotipoOutrosaidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

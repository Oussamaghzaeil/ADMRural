import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotipoPage } from './novotipo.page';

describe('NovotipoPage', () => {
  let component: NovotipoPage;
  let fixture: ComponentFixture<NovotipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotipoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

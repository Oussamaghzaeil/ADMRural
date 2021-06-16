import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovotipomedPage } from './novotipomed.page';

describe('NovotipomedPage', () => {
  let component: NovotipomedPage;
  let fixture: ComponentFixture<NovotipomedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovotipomedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovotipomedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

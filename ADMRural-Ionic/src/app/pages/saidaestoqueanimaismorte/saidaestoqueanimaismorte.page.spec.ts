import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaestoqueanimaismortePage } from './saidaestoqueanimaismorte.page';

describe('SaidaestoqueanimaismortePage', () => {
  let component: SaidaestoqueanimaismortePage;
  let fixture: ComponentFixture<SaidaestoqueanimaismortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaestoqueanimaismortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaestoqueanimaismortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

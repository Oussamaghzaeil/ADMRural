import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaestoqueanimaisPage } from './saidaestoqueanimais.page';

describe('SaidaestoqueanimaisPage', () => {
  let component: SaidaestoqueanimaisPage;
  let fixture: ComponentFixture<SaidaestoqueanimaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaestoqueanimaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaestoqueanimaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

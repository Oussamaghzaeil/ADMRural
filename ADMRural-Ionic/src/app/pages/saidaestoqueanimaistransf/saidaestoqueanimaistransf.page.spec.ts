import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaestoqueanimaistransfPage } from './saidaestoqueanimaistransf.page';

describe('SaidaestoqueanimaistransfPage', () => {
  let component: SaidaestoqueanimaistransfPage;
  let fixture: ComponentFixture<SaidaestoqueanimaistransfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaestoqueanimaistransfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaestoqueanimaistransfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderviewsaidaestoqueanimaistransfPage } from './underviewsaidaestoqueanimaistransf.page';

describe('UnderviewsaidaestoqueanimaistransfPage', () => {
  let component: UnderviewsaidaestoqueanimaistransfPage;
  let fixture: ComponentFixture<UnderviewsaidaestoqueanimaistransfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderviewsaidaestoqueanimaistransfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderviewsaidaestoqueanimaistransfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

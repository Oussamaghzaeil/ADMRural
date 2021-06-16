import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacaoanimalPage } from './situacaoanimal.page';

describe('SituacaoanimalPage', () => {
  let component: SituacaoanimalPage;
  let fixture: ComponentFixture<SituacaoanimalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacaoanimalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacaoanimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

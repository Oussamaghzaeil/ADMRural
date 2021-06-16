import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentacaoanimalPage } from './alimentacaoanimal.page';

describe('AlimentacaoanimalPage', () => {
  let component: AlimentacaoanimalPage;
  let fixture: ComponentFixture<AlimentacaoanimalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentacaoanimalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentacaoanimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

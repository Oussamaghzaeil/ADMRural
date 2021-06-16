import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmedicamentocoletivoeditPage } from './viewmedicamentocoletivoedit.page';

describe('ViewmedicamentocoletivoeditPage', () => {
  let component: ViewmedicamentocoletivoeditPage;
  let fixture: ComponentFixture<ViewmedicamentocoletivoeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmedicamentocoletivoeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmedicamentocoletivoeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmedicamentoeditPage } from './viewmedicamentoedit.page';

describe('ViewmedicamentoeditPage', () => {
  let component: ViewmedicamentoeditPage;
  let fixture: ComponentFixture<ViewmedicamentoeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmedicamentoeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmedicamentoeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

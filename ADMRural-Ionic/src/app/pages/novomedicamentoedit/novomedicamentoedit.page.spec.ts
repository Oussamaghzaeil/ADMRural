import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovomedicamentoeditPage } from './novomedicamentoedit.page';

describe('NovomedicamentoeditPage', () => {
  let component: NovomedicamentoeditPage;
  let fixture: ComponentFixture<NovomedicamentoeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovomedicamentoeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovomedicamentoeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

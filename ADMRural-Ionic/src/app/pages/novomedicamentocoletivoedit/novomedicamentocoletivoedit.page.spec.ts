import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovomedicamentocoletivoeditPage } from './novomedicamentocoletivoedit.page';

describe('NovomedicamentocoletivoeditPage', () => {
  let component: NovomedicamentocoletivoeditPage;
  let fixture: ComponentFixture<NovomedicamentocoletivoeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovomedicamentocoletivoeditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovomedicamentocoletivoeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

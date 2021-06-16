import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoanimalPage } from './novoanimal.page';

describe('NovoanimalPage', () => {
  let component: NovoanimalPage;
  let fixture: ComponentFixture<NovoanimalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoanimalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoanimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

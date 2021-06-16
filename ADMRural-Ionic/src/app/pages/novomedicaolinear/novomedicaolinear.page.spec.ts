import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovomedicaolinearPage } from './novomedicaolinear.page';

describe('NovomedicaolinearPage', () => {
  let component: NovomedicaolinearPage;
  let fixture: ComponentFixture<NovomedicaolinearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovomedicaolinearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovomedicaolinearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

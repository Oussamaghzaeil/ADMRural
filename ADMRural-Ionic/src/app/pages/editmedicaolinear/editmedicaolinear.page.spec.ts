import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmedicaolinearPage } from './editmedicaolinear.page';

describe('EditmedicaolinearPage', () => {
  let component: EditmedicaolinearPage;
  let fixture: ComponentFixture<EditmedicaolinearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmedicaolinearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmedicaolinearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

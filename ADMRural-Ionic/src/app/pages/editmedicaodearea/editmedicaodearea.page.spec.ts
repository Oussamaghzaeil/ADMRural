import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmedicaodeareaPage } from './editmedicaodearea.page';

describe('EditmedicaodeareaPage', () => {
  let component: EditmedicaodeareaPage;
  let fixture: ComponentFixture<EditmedicaodeareaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmedicaodeareaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmedicaodeareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditanimalPage } from './editanimal.page';

describe('EditanimalPage', () => {
  let component: EditanimalPage;
  let fixture: ComponentFixture<EditanimalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditanimalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditanimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

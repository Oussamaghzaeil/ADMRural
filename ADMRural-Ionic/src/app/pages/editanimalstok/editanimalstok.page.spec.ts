import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditanimalstokPage } from './editanimalstok.page';

describe('EditanimalstokPage', () => {
  let component: EditanimalstokPage;
  let fixture: ComponentFixture<EditanimalstokPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditanimalstokPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditanimalstokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

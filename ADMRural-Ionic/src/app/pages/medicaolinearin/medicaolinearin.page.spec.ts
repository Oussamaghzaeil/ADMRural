import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaolinearinPage } from './medicaolinearin.page';

describe('MedicaolinearinPage', () => {
  let component: MedicaolinearinPage;
  let fixture: ComponentFixture<MedicaolinearinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaolinearinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaolinearinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

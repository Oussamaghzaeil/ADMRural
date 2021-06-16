import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaolinearPage } from './medicaolinear.page';

describe('MedicaolinearPage', () => {
  let component: MedicaolinearPage;
  let fixture: ComponentFixture<MedicaolinearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaolinearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaolinearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

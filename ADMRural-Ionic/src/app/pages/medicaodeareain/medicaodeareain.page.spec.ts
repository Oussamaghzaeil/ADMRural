import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaodeareainPage } from './medicaodeareain.page';

describe('MedicaodeareainPage', () => {
  let component: MedicaodeareainPage;
  let fixture: ComponentFixture<MedicaodeareainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicaodeareainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicaodeareainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

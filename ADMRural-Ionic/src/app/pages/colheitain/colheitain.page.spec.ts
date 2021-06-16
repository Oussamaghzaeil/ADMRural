import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColheitainPage } from './colheitain.page';

describe('ColheitainPage', () => {
  let component: ColheitainPage;
  let fixture: ComponentFixture<ColheitainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColheitainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColheitainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockalimPage } from './stockalim.page';

describe('StockalimPage', () => {
  let component: StockalimPage;
  let fixture: ComponentFixture<StockalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderviewtransferedPage } from './underviewtransfered.page';

describe('UnderviewtransferedPage', () => {
  let component: UnderviewtransferedPage;
  let fixture: ComponentFixture<UnderviewtransferedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderviewtransferedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderviewtransferedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

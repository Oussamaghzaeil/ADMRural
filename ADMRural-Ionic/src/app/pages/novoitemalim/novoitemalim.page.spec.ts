import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoitemalimPage } from './novoitemalim.page';

describe('NovoitemalimPage', () => {
  let component: NovoitemalimPage;
  let fixture: ComponentFixture<NovoitemalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoitemalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoitemalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

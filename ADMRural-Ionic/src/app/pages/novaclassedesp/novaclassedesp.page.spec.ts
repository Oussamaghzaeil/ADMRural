import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaclassedespPage } from './novaclassedesp.page';

describe('NovaclassedespPage', () => {
  let component: NovaclassedespPage;
  let fixture: ComponentFixture<NovaclassedespPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaclassedespPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaclassedespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

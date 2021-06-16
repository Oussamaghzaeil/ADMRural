import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaitemsaidaalimPage } from './novaitemsaidaalim.page';

describe('NovaitemsaidaalimPage', () => {
  let component: NovaitemsaidaalimPage;
  let fixture: ComponentFixture<NovaitemsaidaalimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaitemsaidaalimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaitemsaidaalimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

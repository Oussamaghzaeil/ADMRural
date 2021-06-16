import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaitemsaidaoutroPage } from './novaitemsaidaoutro.page';

describe('NovaitemsaidaoutroPage', () => {
  let component: NovaitemsaidaoutroPage;
  let fixture: ComponentFixture<NovaitemsaidaoutroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaitemsaidaoutroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaitemsaidaoutroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

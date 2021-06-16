import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamentocoletivoPage } from './tratamentocoletivo.page';

describe('TratamentocoletivoPage', () => {
  let component: TratamentocoletivoPage;
  let fixture: ComponentFixture<TratamentocoletivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamentocoletivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamentocoletivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

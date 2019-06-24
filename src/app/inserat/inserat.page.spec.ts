import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InseratPage } from './inserat.page';

describe('InseratPage', () => {
  let component: InseratPage;
  let fixture: ComponentFixture<InseratPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InseratPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InseratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

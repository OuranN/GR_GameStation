import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HEADER } from './header';

describe('HEADER', () => {
  let component: HEADER;
  let fixture: ComponentFixture<HEADER>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HEADER],
    }).compileComponents();

    fixture = TestBed.createComponent(HEADER);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

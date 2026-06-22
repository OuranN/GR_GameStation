import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformTag } from './platform-tag';

describe('PlatformTag', () => {
  let component: PlatformTag;
  let fixture: ComponentFixture<PlatformTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformTag],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

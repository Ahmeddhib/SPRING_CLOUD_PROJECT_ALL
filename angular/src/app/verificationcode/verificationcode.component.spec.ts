import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationcodeComponent } from './verificationcode.component';

describe('VerificationcodeComponent', () => {
  let component: VerificationcodeComponent;
  let fixture: ComponentFixture<VerificationcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationcodeComponent]
    });
    fixture = TestBed.createComponent(VerificationcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

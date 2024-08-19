import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegiComponent } from './privilegi.component';

describe('PrivilegiComponent', () => {
  let component: PrivilegiComponent;
  let fixture: ComponentFixture<PrivilegiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

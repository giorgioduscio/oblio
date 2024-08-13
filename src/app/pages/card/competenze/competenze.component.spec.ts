import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenzeComponent } from './competenze.component';

describe('CompetenzeComponent', () => {
  let component: CompetenzeComponent;
  let fixture: ComponentFixture<CompetenzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetenzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralitaComponent } from './generalita.component';

describe('GeneralitaComponent', () => {
  let component: GeneralitaComponent;
  let fixture: ComponentFixture<GeneralitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

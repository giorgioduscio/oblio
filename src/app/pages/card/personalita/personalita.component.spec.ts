import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalitaComponent } from './personalita.component';

describe('PersonalitaComponent', () => {
  let component: PersonalitaComponent;
  let fixture: ComponentFixture<PersonalitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipaggiamentoComponent } from './equipaggiamento.component';

describe('EquipaggiamentoComponent', () => {
  let component: EquipaggiamentoComponent;
  let fixture: ComponentFixture<EquipaggiamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipaggiamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipaggiamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

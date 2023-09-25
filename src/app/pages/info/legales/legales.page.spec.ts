import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegalesPage } from './legales.page';

describe('LegalesPage', () => {
  let component: LegalesPage;
  let fixture: ComponentFixture<LegalesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LegalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

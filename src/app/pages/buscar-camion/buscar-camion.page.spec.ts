import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarCamionPage } from './buscar-camion.page';

describe('BuscarCamionPage', () => {
  let component: BuscarCamionPage;
  let fixture: ComponentFixture<BuscarCamionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuscarCamionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

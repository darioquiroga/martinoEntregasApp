import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarCartaPage } from './buscar-carta.page';

describe('BuscarCartaPage', () => {
  let component: BuscarCartaPage;
  let fixture: ComponentFixture<BuscarCartaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuscarCartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCartaPortePage } from './detalle-carta-porte.page';

describe('DetalleCartaPortePage', () => {
  let component: DetalleCartaPortePage;
  let fixture: ComponentFixture<DetalleCartaPortePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleCartaPortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ContactarConEntregadorPage } from './contactar-con-entregador';

describe('BuscarCamionPage', () => {
  let component: ContactarConEntregadorPage;
  let fixture: ComponentFixture<ContactarConEntregadorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContactarConEntregadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaPorteEncontradasPage } from './carta-porte-encontradas.page';

describe('CartaPorteEncontradasPage', () => {
  let component: CartaPorteEncontradasPage;
  let fixture: ComponentFixture<CartaPorteEncontradasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartaPorteEncontradasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

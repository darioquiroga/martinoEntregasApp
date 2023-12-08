import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BuscarCartaPage } from './buscar-carta.page';

describe('BuscarCartaPage', () => {
  let component: BuscarCartaPage;
  let fixture: ComponentFixture<BuscarCartaPage>;

  beforeEach(async(() => {s
    fixture = TestBed.createComponent(BuscarCartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

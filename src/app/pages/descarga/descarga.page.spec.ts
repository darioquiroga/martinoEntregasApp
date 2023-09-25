import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DescargaPage } from './descarga.page';

describe('DescargaPage', () => {
  let component: DescargaPage;
  let fixture: ComponentFixture<DescargaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DescargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

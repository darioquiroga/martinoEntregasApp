import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamioneroRegistroPage } from './camionero-registro.page';

describe('CamioneroRegistroPage', () => {
  let component: CamioneroRegistroPage;
  let fixture: ComponentFixture<CamioneroRegistroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CamioneroRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopbridgeInfoComponent } from './shopbridge-info.component';

describe('ShopbridgeInfoComponent', () => {
  let component: ShopbridgeInfoComponent;
  let fixture: ComponentFixture<ShopbridgeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopbridgeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopbridgeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

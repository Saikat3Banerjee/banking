import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSupportMenuComponent } from './custom-support-menu.component';

describe('CustomSupportMenuComponent', () => {
  let component: CustomSupportMenuComponent;
  let fixture: ComponentFixture<CustomSupportMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSupportMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSupportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

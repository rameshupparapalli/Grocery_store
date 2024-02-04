import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroceriesComponent } from './edit-groceries.component';

describe('EditGroceriesComponent', () => {
  let component: EditGroceriesComponent;
  let fixture: ComponentFixture<EditGroceriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroceriesComponent]
    });
    fixture = TestBed.createComponent(EditGroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

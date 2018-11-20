import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksLayoutComponent } from './books-layout.component';

describe('BooksLayoutComponent', () => {
  let component: BooksLayoutComponent;
  let fixture: ComponentFixture<BooksLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

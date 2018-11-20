import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAddComponent } from './books-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('BooksAddComponent', () => {
  let component: BooksAddComponent;
  let fixture: ComponentFixture<BooksAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, FormsModule],
      declarations: [ BooksAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAddComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
	});
	
	it('form invalid when empty', () => {
		expect(component.addBooksForm.valid).toBeFalsy();
	});
	
	it('Title field validity', () => {
		let title = component.addBooksForm.controls['title']; 
		expect(title.valid).toBeFalsy(); 
	});

	it('Category field validity', () => {
		let category = component.addBooksForm.controls['category']; 
		expect(category.valid).toBeFalsy(); 
	});

	it('Description field validity', () => {
		let description = component.addBooksForm.controls['description']; 
		expect(description.valid).toBeFalsy(); 
	});

	it('Category field validity with value', () => {
		let errors = {};
		let category = component.addBooksForm.controls['title']; 
		category.setValue("test");
		errors = category.errors || {};
		expect(category.valid).toBeTruthy(); 
	});

	it('description field validity with value', () => {
		let errors = {};
		let description = component.addBooksForm.controls['title']; 
		description.setValue("test");
		errors = description.errors || {};
		expect(description.valid).toBeTruthy(); 
	});

	it('Title field validity with value', () => {
		let errors = {};
		let title = component.addBooksForm.controls['title']; 
		title.setValue("test");
		errors = title.errors || {};
		expect(title.valid).toBeTruthy(); 
	});
});

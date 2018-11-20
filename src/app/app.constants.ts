import { category } from "./models/category";

export class DropdownList {
	static readonly Categories: category[] = [
		{ value: 'drama', viewValue: 'drama' },
		{ value: 'comedy', viewValue: 'comedy' },
		{ value: 'sport', viewValue: 'sport' }
	];
}

export class AppConstants {
	static DropdownList = DropdownList;
}
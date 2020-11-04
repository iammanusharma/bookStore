import { Component, ViewContainerRef } from "@angular/core";
import { OnInit } from "@angular/core";
import { PostService } from "./services/post.service";
import { debuglog } from "util";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Customer, CustomerTransaction, Post } from "./model/post.model";
import { NotFoundError } from "./error-handling/not-found-error";
import { BadInputError } from "./error-handling/bad-input-error";
import { AppError } from "./error-handling/app-error";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { BrowserModule } from "@angular/platform-browser";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  posts: Post[];
  post: Post = new Post();
  customer: Customer[];
  customerDetails: Customer;
  customerTransactionDetails: CustomerTransaction[]=[];
  emailValidationForm: FormGroup;
  customerDisplay: Customer[];

  constructor(
    private services: PostService,
    vcr: ViewContainerRef, private formBuilder:FormBuilder
  ) {

  }

  ngOnInit() {
    this.emailValidationForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
    this.emailValidationForm.valueChanges.subscribe((data) => {
       this.displayFilter(data);
    });
    this.services.getAll().subscribe((response: Customer[]) => {
      // this.posts = response;
      this.customer = response;
      this.customerDisplay = response;
    });
  }

  displayFilter(data) {

    if (this.customer && this.customer.length > 0) {
      this.customerDisplay = this.transform(this.customer,data.email);
    } else {
      this.customerDisplay = this.customer;
    }
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.CustomerFirstName.toLowerCase().includes(searchText);
    });
  }

  // logValidationErrors(group: FormGroup = this.parent): void {
  //   Object.keys(group.controls).forEach((key: string) => {
  //     const abstractControl = group.get(key);
  //     this.formErrors[key] = '';
  //     if (abstractControl && !abstractControl.valid &&
  //       (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
  //       const messages = this.validationMessages[key];
  //       for (const errorKey in abstractControl.errors) {
  //         if (errorKey) {
  //           this.formErrors[key] = messages[errorKey] + ' ';
  //         }
  //       }
  //     }
  //     if (abstractControl instanceof FormGroup) {
  //       this.logValidationErrors(abstractControl);
  //     }
  //   });
  // }

  // private _filter(value: string): StreetType[] {
  //   if (value && value.length >= 3) {
  //     const filterValue = this._normalizeValue(value);
  //     return this.streetTypeData.filter(streetType => this._normalizeValue(streetType.name).includes(filterValue));
  //   } else {
  //     return [];
  //   }
  // }

  getCustomerDetails(customerId: number) {
    this.services.getCustomerDetails(customerId).subscribe((response) => {
      this.customerTransactionDetails = response;
    })
  }
}

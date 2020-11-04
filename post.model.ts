export class Post {
  public userId: string;
  public id: string;
  public title: string;
  public body: string;
}

 export class Customer {
	public CustomerId: number;
	public CustomerFirstName: string;
	public CustomerLastName: string;
	public CustomerContact: string;
}
export interface Transaction {
	id: number;
	amount: number;
	date: string;
	transactionCode: string;
}

export interface CustomerTransaction {
	customerId: number;
	customerFirstName: string;
	customerLastName: string;
	customerContact: string;
	accountId: number;
	accountBalance: number;
	transactionId: number;
	transactionAmount?: any;
	transactionDate?: any;
	transactionCode?: any;
	transactions: Transaction[];
}

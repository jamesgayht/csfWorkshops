export interface LineItems {
    item: string; 
    quantity: number;
}

export interface Order {
    name: string;
    email: string; 
    lineItems: LineItems;
}
export interface TransactionMetadata {
  name: string;
  type: string;
  email: string;
  quantity: number;
  country: string;
  product_name?: string;
}

export interface TransactionType {
  amount: number;
  metadata?: TransactionMetadata;
  payment_reference?: string;
  status: "successful" | "pending" | "failed";
  type: "deposit" | "withdrawal";
  date: string;
}

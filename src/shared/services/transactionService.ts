import { api } from "./api";
import type { TransactionType } from "../types/transactionType";

export const fetchTransactions = async (): Promise<TransactionType[]> => {
  const { data } = await api.get("/transactions");
  return data;
};

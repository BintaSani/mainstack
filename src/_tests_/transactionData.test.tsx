import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "@/shared/context/filterContext";
import TransactionsList from "@/features/transactions/components/transactionList";
import * as transactionService from "@/shared/services/transactionService";
import "@testing-library/jest-dom";

// Create a fresh React Query client for each test
const queryClient = new QueryClient();
const createTestClient = () => new QueryClient();

// Mock the transactionService module
vi.mock("@/shared/services/transactionService", () => ({
  fetchTransactions: vi.fn(),
}));

describe("Transaction List data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and displays transaction data", async () => {
    // mock the transaction data returned by API
    (
      transactionService.fetchTransactions as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce([
      {
        amount: 5000,
        metadata: {
          name: "Jane Doe",
          type: "purchase",
          email: "jane@example.com",
          quantity: 2,
          country: "Nigeria",
          product_name: "E-book",
        },
        payment_reference: "TX12345",
        status: "successful",
        type: "deposit",
        date: "Mar 10, 2025",
      },
      {
        amount: 2500,
        metadata: {
          name: "John Smith",
          type: "purchase",
          email: "john@example.com",
          quantity: 1,
          country: "Ghana",
          product_name: "Course",
        },
        payment_reference: "TX67890",
        status: "pending",
        type: "withdrawal",
        date: "Mar 11, 2025",
      },
    ]);

    // Render the component inside React Query provider
    render(
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <TransactionsList />
        </FilterProvider>
      </QueryClientProvider>
    );

    // loading state
    expect(
      await screen.findByText(/Loading transactions.../i)
    ).toBeInTheDocument();

    // Wait for transactions to appear
    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("John Smith")).toBeInTheDocument();
      expect(screen.getByText(/E-book/i)).toBeInTheDocument();
      expect(screen.getByText(/Course/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          (content) => content.includes("USD") && content.includes("5000")
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          (content) => content.includes("USD") && content.includes("2500")
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Mar 10, 2025/i)).toBeInTheDocument();
      expect(screen.getByText(/Mar 11, 2025/i)).toBeInTheDocument();
    });
  });

  it("renders an error message when the API call fails", async () => {
    (
      transactionService.fetchTransactions as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error("Network error"));

    render(
      <QueryClientProvider client={createTestClient()}>
        <FilterProvider>
          <TransactionsList />
        </FilterProvider>
      </QueryClientProvider>
    );

    // shows loading state
    expect(
      await screen.findByText(/Loading transactions.../i)
    ).toBeInTheDocument();

    // waits for error state to appear

    expect(
      await screen.findByText(
        /Error loading transactions./i,
        {},
        { timeout: 2000 }
      )
    ).toBeInTheDocument();

    // data should not be shown
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
  });
});

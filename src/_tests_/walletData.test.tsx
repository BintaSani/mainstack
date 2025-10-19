import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StatsOverview from "@/features/ledger/components/statcard";
import * as userService from "@/shared/services/userService";
import "@testing-library/jest-dom";

// Create a fresh React Query client for each test
const queryClient = new QueryClient();

//Mock the userService module
vi.mock("@/shared/services/userService", () => ({
  fetchWallet: vi.fn(),
  fetchUser: vi.fn(),
}));

describe("StatsOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and displays wallet data", async () => {
    // Arrange: mock the wallet data returned by API
    (userService.fetchWallet as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      {
        balance: 12000,
        total_payout: 5000,
        total_revenue: 17000,

        pending_payout: 2000,
        ledger_balance: 10000,
      }
    );

    // Render the component inside React Query provider
    render(
      <QueryClientProvider client={queryClient}>
        <StatsOverview />
      </QueryClientProvider>
    );

    // Assert: shows loading initially
    expect(await screen.findAllByText(/USD 0.00/i)).toHaveLength(4);

    // Wait until the mock data appears
    await waitFor(() => {
      expect(screen.getByText(/USD 10000.00/i)).toBeInTheDocument();
      expect(screen.getByText(/USD 5000.00/i)).toBeInTheDocument();
      expect(screen.getByText(/USD 17000.00/i)).toBeInTheDocument();
      expect(screen.getByText(/USD 2000.00/i)).toBeInTheDocument();
    });
  });
});

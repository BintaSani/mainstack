import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as userService from "@/shared/services/userService";
import { MemoryRouter } from "react-router-dom";
import Navbar from "@/shared/components/navbar";
import "@testing-library/jest-dom";

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

//Mock API module
vi.mock("@/shared/services/userService", () => ({
  fetchWallet: vi.fn(),
  fetchUser: vi.fn(),
}));

describe("Navbar", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestClient();
    vi.clearAllMocks();
  });

  it("fetches user data and shows it in the profile dropdown", async () => {
    // mock API response
    (userService.fetchUser as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    });

    // Render component wrapped in QueryClientProvider
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Initially the dropdown should not be visible
    let dropdown = screen.queryByTestId("profile-menu");
    expect(dropdown).not.toBeInTheDocument();

    // Wait for React Query to load the  user data
    await waitFor(() => {
      expect(userService.fetchUser).toHaveBeenCalled();
    });

    // Click to open dropdown
    const button = await screen.findByTestId("profile-button");
    await userEvent.click(button);

    // Now dropdown should appear
    dropdown = await screen.findByTestId("profile-menu");
    expect(dropdown).toBeInTheDocument();

    // the user data is shown in the dropdown
    await waitFor(() => {
      const names = screen.getAllByText(/John Doe/i);
      const emails = screen.getAllByText(/john.doe@example.com/i);
      expect(names.length).toBeGreaterThan(0);
      expect(emails.length).toBeGreaterThan(0);
    });
  });

  it("should display  mobile dropdown", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const button = screen.getByTestId("mobile-menu-button");
    await userEvent.click(button);

    const dropdown = await screen.findByTestId("mobile-menu-dropdown");
    expect(dropdown).toBeInTheDocument();
  });
});

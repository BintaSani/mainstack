import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { FilterProvider } from "@/shared/context/filterContext";
import FilterDrawer from "@/features/filter/components/filterDrawer";
import TransactionsList from "@/features/transactions/components/transactionList";
import EmptyState from "@/features/transactions/components/emptyState";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();
const renderWithContext = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <FilterProvider>
          <TransactionsList />
          <FilterDrawer />
          <EmptyState />
        </FilterProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );

describe("open drawer and filter transactions", () => {
  it("opens filter drawer when filter button is clicked", async () => {
    renderWithContext();
    let filterButton = screen.getByTestId("filter-button");
    let drawer = screen.getByTestId("filter-drawer");

    await userEvent.click(filterButton);
    expect(drawer).toBeVisible();

    //   expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("shows empty state when filters exclude all transactions", async () => {
    renderWithContext();
    let filterButton = screen.getByTestId("filter-button");
    let drawer = screen.getByTestId("filter-drawer");

    await userEvent.click(filterButton);
    expect(drawer).toBeVisible();

    await userEvent.click(filterButton);
    let applyButton = screen.getByTestId("apply-filters-button");
    await userEvent.click(applyButton);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});

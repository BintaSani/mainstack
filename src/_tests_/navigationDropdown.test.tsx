import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import "@testing-library/jest-dom";
import Navbar from "@/shared/components/navbar";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const RenderWithProviders = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("show dropdown", () => {
  it("app dropdown become visible on button click", async () => {
    RenderWithProviders();

    const button = screen.getByTestId("app-button");

    let dropdown = screen.queryByTestId("app-dropDown");
    expect(dropdown).not.toBeInTheDocument();

    await userEvent.click(button);
    dropdown = screen.queryByTestId("app-dropDown");
    expect(dropdown).toBeInTheDocument();

    await userEvent.click(button);
    dropdown = screen.queryByTestId("app-dropDown");
    expect(dropdown).not.toBeInTheDocument();
  });

  it("profile dropdown become visible on button click", async () => {
    RenderWithProviders();

    const button = screen.getByTestId("profile-button");

    let dropdown = screen.queryByTestId("profile-menu");
    expect(dropdown).not.toBeInTheDocument();

    await userEvent.click(button);
    dropdown = screen.queryByTestId("profile-menu");
    expect(dropdown).toBeInTheDocument();

    await userEvent.click(button);
    dropdown = screen.queryByTestId("profile-menu");
    expect(dropdown).not.toBeInTheDocument();
  });

  it("mobile menu dropdown becomes visible on button click", async () => {
    RenderWithProviders();

    const button = screen.getByTestId("mobile-menu-button");

    // Initially hidden
    let dropdown = screen.queryByTestId("mobile-menu-dropdown");
    expect(dropdown).not.toBeInTheDocument();

    // Opens on first click
    await userEvent.click(button);
    dropdown = screen.queryByTestId("mobile-menu-dropdown");
    expect(dropdown).toBeInTheDocument();

    // Closes on second click
    await userEvent.click(button);
    dropdown = screen.queryByTestId("mobile-menu-dropdown");
    expect(dropdown).not.toBeInTheDocument();
  });
});

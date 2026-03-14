/**
 * DataTable: renders rows from data and filter behavior.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "@/components/Table/DataTable";
import type { User } from "@/services/api";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "123",
    website: "alice.dev",
    company: { name: "Acme" },
  },
  {
    id: 2,
    name: "Bob Jones",
    email: "bob@example.com",
    phone: "456",
    website: "bob.dev",
    company: { name: "Beta" },
  },
];

describe("DataTable", () => {
  it("renders rows correctly from mock data", () => {
    render(<DataTable users={mockUsers} />);

    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Bob Jones")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
  });

  it("filters rows when search input changes", async () => {
    const user = userEvent.setup();
    render(<DataTable users={mockUsers} />);

    const search = screen.getByRole("searchbox", { name: /filter by name or email/i });
    await user.type(search, "alice");

    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.queryByText("Bob Jones")).not.toBeInTheDocument();
  });
});

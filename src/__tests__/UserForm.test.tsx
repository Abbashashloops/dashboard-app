/**
 * UserForm: validation and submit callback.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "@/components/UserForm/UserForm";

describe("UserForm", () => {
  it("shows validation errors on empty submit", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<UserForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /add user/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with user data when valid", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<UserForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/^name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^phone/i), "555-1234");
    await user.click(screen.getByRole("button", { name: /add user/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "555-1234",
      })
    );
  });
});

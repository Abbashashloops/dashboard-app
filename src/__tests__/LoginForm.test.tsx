/**
 * LoginForm: validation and error display.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/components/LoginForm/LoginForm";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/store/authStore", () => ({
  useAuthStore: (selector: (s: { setAuth: (t: string) => void }) => void) => {
    const setAuth = jest.fn();
    return selector({ setAuth });
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submit = screen.getByRole("button", { name: /sign in/i });
    await user.click(submit);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("shows email format error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(emailInput, "notanemail");
    await user.type(passwordInput, "somepassword");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});

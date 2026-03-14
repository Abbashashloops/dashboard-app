"use client";

/**
 * Add-user form with react-hook-form validation. Submits to parent callback;
 * no API call — new user is prepended to table state in the dashboard.
 */
import { useForm } from "react-hook-form";
import { isValidEmail, required } from "@/utils/validation";
import type { User } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export type UserFormValues = {
  name: string;
  email: string;
  phone: string;
};

type UserFormProps = {
  onSubmit: (user: Omit<User, "id">) => void;
};

export function UserForm({ onSubmit }: UserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: { name: "", email: "", phone: "" },
  });

  function onFormSubmit(values: UserFormValues) {
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      website: "-",
      company: { name: "-" },
    });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex w-full flex-col gap-4"
      noValidate
    >
      <h2 className="text-lg font-semibold text-slate-800">Add New User</h2>
      <Input
        label="Name"
        type="text"
        placeholder="Full name"
        error={errors.name?.message}
        {...register("name", {
          required: "Name is required",
          validate: (v) => (required(v) ? true : "Name is required"),
        })}
      />
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          validate: (v) => (isValidEmail(v) ? true : "Enter a valid email"),
        })}
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 234 567 8900"
        error={errors.phone?.message}
        {...register("phone", {
          required: "Phone is required",
          validate: (v) => (required(v) ? true : "Phone is required"),
        })}
      />
      <Button type="submit">Add user</Button>
    </form>
  );
}

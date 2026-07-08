"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const fields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    isRequired: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    isRequired: true,
    validate: (value) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
        return "Please enter a valid email address";
      return null;
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    isRequired: true,
    description: "Min 8 characters, 1 uppercase, 1 number",
    validate: (value) => {
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
      if (!/[0-9]/.test(value)) return "Must contain at least one number";
      return null;
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Re-enter your password",
    isRequired: true,
  },
];

const SignUpPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Sign up data:", data);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 md:p-10"
      style={{ backgroundColor: "#f0f7ee" }}
    >
      {/* Card */}
      <div
        className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl"
        style={{ minHeight: "580px" }}
      >
        {/* Left — Image Panel */}
        <div className="hidden lg:flex w-[45%] relative flex-shrink-0">
          <Image
            src="/assets/login.jpg"
            alt="Sign Up"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-10"
            style={{
              background:
                "linear-gradient(to top, rgba(101,146,135,0.92) 0%, rgba(101,146,135,0.3) 60%, transparent 100%)",
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#B1D3B9" }}
            >
              BookBridge — University Library
            </span>
            <h1 className="text-3xl font-bold text-white leading-tight mb-3">
              Your campus library,
              <br />
              always within reach.
            </h1>
            <p style={{ color: "#E6F2DD" }} className="text-sm leading-relaxed">
              Borrow books, manage reservations, and track your reading history —
              all from one place.
            </p>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div
          className="flex-1 flex items-center justify-center px-8 py-10"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="w-full max-w-sm">
            <div className="mb-7">
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: "#659287" }}
              >
                Create an account
              </h2>
              <p className="text-sm" style={{ color: "#88BDA4" }}>
                Already have one?{" "}
                <Link
                  href="/signin"
                  className="font-semibold underline"
                  style={{ color: "#659287" }}
                >
                  Sign in
                </Link>
              </p>
            </div>

            <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {fields.map(({ name, label, type, placeholder, isRequired, description, validate }) => (
                <TextField
                  key={name}
                  name={name}
                  type={type}
                  isRequired={isRequired}
                  validate={validate}
                  className="w-full"
                >
                  <Label
                    className="text-sm font-medium mb-1 block"
                    style={{ color: "#659287" }}
                  >
                    {label}
                  </Label>
                  <Input
                    placeholder={placeholder}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#B1D3B9",
                      color: "#333",
                    }}
                  />
                  {description && (
                    <Description className="text-xs mt-1" style={{ color: "#88BDA4" }}>
                      {description}
                    </Description>
                  )}
                  <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>
              ))}

              <Button
                type="submit"
                className="w-full mt-2 font-semibold text-white rounded-lg py-2"
                style={{ backgroundColor: "#659287" }}
              >
                Create Account
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
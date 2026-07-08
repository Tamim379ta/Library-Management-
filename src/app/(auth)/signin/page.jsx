"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const fields = [
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
  },
];

const SignInPage = () => {
  const router = useRouter();
const onSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = Object.fromEntries(new FormData(e.currentTarget).entries());

  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });

  if(data){
    toast.success("Signed in successfully!");
    router.push("/");
  }

  if (error) {
    toast.error(error.message);
    return;
  }

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
            alt="Sign In"
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
              Welcome back,
              <br />
              keep reading.
            </h1>
            <p style={{ color: "#E6F2DD" }} className="text-sm leading-relaxed">
              Access your borrowed books, reservations, and reading history —
              right where you left off.
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
                Sign in
              </h2>
              <p className="text-sm" style={{ color: "#88BDA4" }}>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold underline"
                  style={{ color: "#659287" }}
                >
                  Sign up
                </Link>
              </p>
            </div>

            <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {fields.map(({ name, label, type, placeholder, isRequired, validate }) => (
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
                  <FieldError className="text-red-500 text-xs mt-1" />
                </TextField>
              ))}

              {/* Forgot password */}
              <div className="flex justify-end -mt-2">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium"
                  style={{ color: "#659287" }}
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full mt-1 font-semibold text-white rounded-lg py-2"
                style={{ backgroundColor: "#659287" }}
              >
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
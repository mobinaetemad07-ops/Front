'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email "),
  password: z.string().min(6, "Password is required"),
});

export default function LoginPage() {
  const { login, isLoggingIn, error: authError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 p-12 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">
            {authError}
          </div>
        )}

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border p-3 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-slate-800 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center text-sm">
          <Link href="/register/student" className="text-blue-500">Register as Student</Link>
          {" | "}
          <Link href="/register/tutor" className="text-blue-500">Register as Tutor</Link>
        </div>
      </form>
    </div>
  );
}
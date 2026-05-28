"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import api from "../../../utils/axios";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const registerStudentSchema = z.object({
  first_name: z.string().min(6, "First name is required"),
  last_name: z.string().min(6, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterStudent() {
  const { login, isLoggingIn } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerStudentSchema),
  });

  const onSubmit = async (data) => {
    setServerError(null);
    setIsRegistering(true);

    try {
    
      await api.post("/register/", {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        is_teacher: false,
      });

      
      await login({ email: data.email, password: data.password });
    
     

    } catch (error) {
      console.error("Registration error:", error);
      
      
      const message = error.response?.data?.email?.[0] ||
                      error.response?.data?.detail ||
                      error.response?.data?.message ||
                      "Registration failed. Please try again.";
      setServerError(message);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 p-12 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-8">
          Register as Student
        </h1>

        {serverError && (
          <div className="mb-4 p-3 bg-red-200 text-center text-red-700 rounded-md text-sm">
            {serverError}
          </div>
        )}

        <div className="mb-4">
          <input
            {...register("first_name")}
            placeholder="First Name"
            className="w-full border border-gray-400 p-3 rounded"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("last_name")}
            placeholder="Last Name"
            className="w-full border border-gray-400 p-3 rounded"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border border-gray-400 p-3 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-8">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 p-3 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isRegistering || isLoggingIn}
          className="w-full text-lg font-bold bg-slate-800 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
           {isRegistering ? "Creating account..." : "Register"}
        </button>

        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}
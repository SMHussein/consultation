"use client";

import { login } from "@/src/app/_api/serverFunctions";
import Logo from "../_components/Logo";
import { useActionState, useEffect } from "react";
import Button from "../_components/Button";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [formState, formAction] = useActionState(login, {});

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error);
    }
    if (formState.success) {
      toast.success(formState.success);
    }
  }, [formState]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 col-span-3">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center border-b py-2 mb-4">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form action={formAction} className="space-y-4 flex flex-col gap-12">
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  );
}

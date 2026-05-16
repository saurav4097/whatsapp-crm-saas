"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] =
    useState({

      businessName: "",

      email: "",

      whatsappNumber: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");

    const res = await fetch(
      "/api/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {

      setError(
        data.error ||
        "Login failed"
      );

      return;
    }

    router.push("/dashboard");
  };

  return (

    <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >

        <h1 className="text-3xl font-bold">
          Business Login
        </h1>

        <input
          name="businessName"
          placeholder="Business Name"
          className="w-full p-4 rounded-lg bg-slate-800"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full p-4 rounded-lg bg-slate-800"
          onChange={handleChange}
        />

        <input
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          className="w-full p-4 rounded-lg bg-slate-800"
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        <button
          className="w-full bg-green-500 p-4 rounded-lg"
        >
          Login
        </button>

      </form>

    </main>
  );
}
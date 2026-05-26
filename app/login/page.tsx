"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import Link
from "next/link";

export default function LoginPage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({

      businessName: "",

      email: "",

      whatsappNumber: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res =
        await fetch(
          "/api/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              businessName:
                formData.businessName.trim(),

              email:
                formData.email.trim(),

              whatsappNumber:
                formData.whatsappNumber.trim(),
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {

        setError(
          data.error ||
          "Login failed"
        );

        setLoading(false);

        return;
      }

      router.push(
        "/dashboard"
      );

      router.refresh();

    } catch {

      setError(
        "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full" />

      </div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 w-full max-w-md"
      >

        {/* LOGO */}

        <div className="mb-8 text-center">

          <h1 className="text-5xl font-black">

            <span className="text-white">
              Lead
            </span>

            <span className="text-green-500">
              Pilot
            </span>

          </h1>

          <p className="text-gray-400 mt-3">

            Business Dashboard Login

          </p>

        </div>

        {/* INPUTS */}

        <div className="space-y-5">

          <div>

            <label className="text-sm text-gray-400 block mb-2">

              Business Name

            </label>

            <input
              type="text"
              name="businessName"
              required
              placeholder="Workhatch Coaching"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 outline-none rounded-2xl px-5 py-4"
            />

          </div>

          <div>

            <label className="text-sm text-gray-400 block mb-2">

              Email

            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="business@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 outline-none rounded-2xl px-5 py-4"
            />

          </div>

          <div>

            <label className="text-sm text-gray-400 block mb-2">

              WhatsApp Number

            </label>

            <input
              type="text"
              name="whatsappNumber"
              required
              placeholder="919876543210"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 outline-none rounded-2xl px-5 py-4"
            />

          </div>

        </div>

        {/* ERROR */}

        {error && (

          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 mt-6 text-sm">

            {error}

          </div>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-7 bg-green-500 hover:bg-green-600 disabled:opacity-50 transition text-black font-black rounded-2xl py-4"
        >

          {loading
            ? "Logging In..."
            : "Open Dashboard"}

        </button>

        {/* HOME */}

        <Link
          href="/"
          className="block text-center text-gray-400 hover:text-green-400 transition mt-6 text-sm"
        >
          Back To Home
        </Link>

      </form>

    </main>
  );
}
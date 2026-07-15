"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await registerUser(
        username,
        email,
        password
      );

      if (result.message) {
        alert("Registration Successful!");
        router.push("/login");
      } else {
        alert(result.detail || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleRegister}
        className="bg-slate-900 w-full max-w-md rounded-xl p-8 shadow-xl"
      >

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full mt-3 border border-green-500 text-green-400 py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("username", result.username);

        alert("Login Successful!");

        router.push("/");
      } else {
        alert(result.detail || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 w-full max-w-md rounded-xl p-8 shadow-xl"
      >

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Login
        </h1>

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?
        </p>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full mt-3 border border-blue-500 text-blue-400 py-3 rounded-lg"
        >
          Register
        </button>

      </form>

    </div>
  );
}
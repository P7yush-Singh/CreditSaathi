// app/user/login/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // If already logged in, redirect — optional: check session endpoint
    const check = async () => {
      const res = await fetch("/api/user/check-session");
      const data = await res.json();
      if (data?.loggedIn) router.push("/"); // or /user/dashboard
    };
    check();
  }, [router]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // cookie set by server
      router.push("/"); // or /user/dashboard
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1724] to-[#071029] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/6 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Welcome back</h2>

        {msg && <p className="text-sm text-red-400 mb-3">{msg}</p>}

        <label className="text-xs text-gray-300">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded-md bg-white/4 border border-white/6 text-white placeholder:text-white/60"
          placeholder="you@example.com"
          required
        />

        <label className="text-xs text-gray-300">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-md bg-white/4 border border-white/6 text-white placeholder:text-white/60"
          placeholder="Your password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#09E85E] text-black font-semibold hover:brightness-95 transition"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        <p className="text-sm text-gray-300 text-center mt-4">
          New here?{" "}
          <a href="/user/signup" className="text-[#09E85E] hover:underline">Create an account</a>
        </p>
      </form>
    </div>
  );
}

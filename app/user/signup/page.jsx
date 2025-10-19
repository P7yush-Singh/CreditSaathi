// app/user/signup/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      // success — cookie is set by server
      router.push("/"); // redirect to home or user dashboard later
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
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Create your Credit Saathi account</h2>

        {msg && <p className="text-sm text-red-400 mb-3">{msg}</p>}

        <label className="text-xs text-gray-300">Full name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded-md bg-white/4 border border-white/6 text-white placeholder:text-white/60"
          placeholder="Enter Your Name"
          required
        />

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
          placeholder="Choose a password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-[#09E85E] text-black font-semibold hover:brightness-95 transition"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p className="text-sm text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <a href="/user/login" className="text-[#09E85E] hover:underline">Log in</a>
        </p>
      </form>
    </div>
  );
}

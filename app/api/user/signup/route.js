// app/api/user/signup/route.js
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 400 });
    }

    const user = await User.create({ name, email, password });

    // set session cookie (7 days)
    const cookie = serialize("user_session", user._id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return new Response(JSON.stringify({ message: "Signup successful", user: { id: user._id, name: user.name, email: user.email } }), {
      status: 201,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

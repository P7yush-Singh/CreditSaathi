// app/api/user/login/route.js
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // set session cookie (7 days)
    const cookie = serialize("user_session", user._id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return new Response(JSON.stringify({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

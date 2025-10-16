import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // Create a cookie valid for 7 days
    const cookie = serialize("admin_session", admin._id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

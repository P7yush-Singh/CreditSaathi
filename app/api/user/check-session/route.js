// app/api/user/check-session/route.js
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = cookies();
    const session = cookieStore.get("user_session");

    // No session cookie found
    if (!session) {
      return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
    }

    // Find user in DB
    const user = await User.findById(session.value)
      .select("name email savedCards recentViews")
      .lean();

    // If user doesn’t exist
    if (!user) {
      return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
    }

    // Success: return user
    return new Response(JSON.stringify({ loggedIn: true, user }), { status: 200 });
  } catch (err) {
    console.error("Check session error:", err);
    return new Response(JSON.stringify({ loggedIn: false, error: err.message }), {
      status: 500,
    });
  }
}

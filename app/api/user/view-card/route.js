// app/api/user/view-card/route.js
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const cookieStore = cookies();
    const session = cookieStore.get("user_session");
    if (!session) return new Response(JSON.stringify({ error: "Not logged in" }), { status: 401 });

    const userId = session.value;
    const { cardId } = await req.json();
    if (!cardId) return new Response(JSON.stringify({ error: "cardId required" }), { status: 400 });

    // push to recentViews (keep last 10, unique)
    const user = await User.findById(userId);
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    // remove if exists then unshift
    user.recentViews = user.recentViews.filter((c) => c.toString() !== cardId);
    user.recentViews.unshift(cardId);
    user.recentViews = user.recentViews.slice(0, 10);
    await user.save();

    return new Response(JSON.stringify({ message: "View recorded" }), { status: 200 });
  } catch (err) {
    console.error("view-card error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

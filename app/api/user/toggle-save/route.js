// app/api/user/toggle-save/route.js
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { cardId } = body;

    const cookieStore = cookies();
    const userId = cookieStore.get("user_session")?.value;

    if (!userId) {
      return new Response(JSON.stringify({ error: "Not logged in" }), {
        status: 401,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const isSaved = user.savedCards.includes(cardId);
    if (isSaved) {
      user.savedCards = user.savedCards.filter((id) => id.toString() !== cardId);
    } else {
      user.savedCards.push(cardId);
    }

    await user.save();

    return new Response(
      JSON.stringify({ saved: !isSaved, message: isSaved ? "Card removed" : "Card saved" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

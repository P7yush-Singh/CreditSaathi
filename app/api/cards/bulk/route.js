// app/api/cards/bulk/route.js
import { connectDB } from "@/lib/db";
import Card from "@/models/Card";

export async function POST(req) {
  try {
    await connectDB();

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid or missing card IDs" }), {
        status: 400,
      });
    }

    // Find all cards by IDs
    const cards = await Card.find({ _id: { $in: ids } });

    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (err) {
    console.error("Error fetching bulk cards:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

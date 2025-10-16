import { connectDB } from "@/lib/db";
import Card from "@/models/Card";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const card = await Card.findById(id);
      if (!card)
        return new Response(JSON.stringify({ error: "Card not found" }), {
          status: 404,
        });
      return new Response(JSON.stringify(card), { status: 200 });
    }

    // If no ID -> return all cards
    const cards = await Card.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

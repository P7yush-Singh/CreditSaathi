// app/api/cards/get/[id]/route.js
import {connectDB} from "@/lib/db";
import Card from "@/models/Card";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params?.id;
    const card = await Card.findById(id).lean();

    if (!card) {
      return new Response(JSON.stringify({ error: "Card not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(card), { status: 200 });
  } catch (err) {
    console.error("Error fetching card by id:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

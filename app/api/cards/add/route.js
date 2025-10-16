import { connectDB } from "@/lib/db";
import Card from "@/models/Card";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();
    const newCard = await Card.create(data);

    return new Response(JSON.stringify({ message: "Card added successfully", card: newCard }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

import { connectDB } from "@/utils/db";
import Card from "@/models/Card";

// ✅ Add new card (POST)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newCard = await Card.create(body);
    return new Response(JSON.stringify(newCard), { status: 201 });
  } catch (error) {
    console.error("Error adding card:", error);
    return new Response("Failed to add card", { status: 500 });
  }
}

// ✅ Get all cards (GET)
export async function GET() {
  try {
    await connectDB();
    const cards = await Card.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return new Response("Failed to fetch cards", { status: 500 });
  }
}

import {connectDB} from "@/lib/db";
import Card from "@/models/Card";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const cards = await Card.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (error) {
    console.error("Error fetching category cards:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cards" }), {
      status: 500,
    });
  }
}

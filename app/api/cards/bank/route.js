import {connectDB} from "@/lib/db";
import Card from "@/models/Card";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const bankName = searchParams.get("bank");

    if (!bankName) {
      return new Response(JSON.stringify({ error: "Bank name required" }), {
        status: 400,
      });
    }

    // 🔍 Case-insensitive + partial match
    const cards = await Card.find({
      bank: { $regex: bankName, $options: "i" },
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (error) {
    console.error("Error fetching cards by bank:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cards" }), {
      status: 500,
    });
  }
}

import {connectDB} from "@/lib/db";
import Card from "@/models/Card";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const bank = searchParams.get("bank");

    if (!bank)
      return new Response(JSON.stringify({ error: "Bank name required" }), {
        status: 400,
      });

    const cards = await Card.find({
      bank: { $regex: new RegExp(`^${bank}$`, "i") },
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch cards" }), {
      status: 500,
    });
  }
}

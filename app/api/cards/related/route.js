import {connectDB} from "@/lib/db";
import Card from "@/models/Card";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const bank = searchParams.get("bank");

    const query = {};
    if (category) query.category = category;
    if (bank) query.bank = bank;

    const cards = await Card.find(query).limit(6);
    return new Response(JSON.stringify(cards), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch related cards" }), {
      status: 500,
    });
  }
}

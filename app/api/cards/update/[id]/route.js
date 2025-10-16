import { connectDB } from "@/lib/db";
import Card from "@/models/Card";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const data = await req.json();
    const updated = await Card.findByIdAndUpdate(params.id, data, { new: true });
    return new Response(JSON.stringify({ message: "Card updated", card: updated }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}

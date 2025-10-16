import { connectDB } from "@/lib/db";
import Card from "@/models/Card";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Card.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: "Card deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete card" }), { status: 500 });
  }
}

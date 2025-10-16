import { connectDB } from "@/utils/db";
import Card from "@/models/Card";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedCard = await Card.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedCard) return new Response("Card not found", { status: 404 });
    return new Response(JSON.stringify(updatedCard), { status: 200 });
  } catch (error) {
    console.error("Error updating card:", error);
    return new Response("Failed to update card", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deletedCard = await Card.findByIdAndDelete(params.id);
    if (!deletedCard) return new Response("Card not found", { status: 404 });
    return new Response("Card deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting card:", error);
    return new Response("Failed to delete card", { status: 500 });
  }
}

import connectDB from "@/lib/db";
import Bank from "@/models/Bank";

export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    const updatedBank = await Bank.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBank)
      return new Response(JSON.stringify({ error: "Bank not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(updatedBank), { status: 200 });
  } catch (error) {
    console.error("Error updating bank:", error);
    return new Response(JSON.stringify({ error: "Failed to update bank" }), {
      status: 500,
    });
  }
}

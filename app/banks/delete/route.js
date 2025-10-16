import connectDB from "@/lib/db";
import Bank from "@/models/Bank";

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deleted = await Bank.findByIdAndDelete(id);
    if (!deleted)
      return new Response(JSON.stringify({ error: "Bank not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify({ message: "Bank deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting bank:", error);
    return new Response(JSON.stringify({ error: "Failed to delete bank" }), {
      status: 500,
    });
  }
}

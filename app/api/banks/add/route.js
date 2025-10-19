import {connectDB} from "@/lib/db";
import Bank from "@/models/Bank";

export async function POST(req) {
  try {
    await connectDB();
    const { name, logo } = await req.json();

    if (!name || !logo) {
      return new Response(JSON.stringify({ error: "Name and logo required" }), {
        status: 400,
      });
    }

    const newBank = new Bank({ name, logo });
    await newBank.save();

    return new Response(JSON.stringify(newBank), { status: 201 });
  } catch (error) {
    console.error("Error adding bank:", error);
    return new Response(JSON.stringify({ error: "Failed to add bank" }), {
      status: 500,
    });
  }
}

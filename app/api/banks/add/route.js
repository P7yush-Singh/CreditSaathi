import {connectDB} from "@/lib/db";
import Bank from "@/models/Bank";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, logo } = body;

    if (!name || !logo)
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
      });

    const existing = await Bank.findOne({ name });
    if (existing)
      return new Response(
        JSON.stringify({ error: "Bank already exists" }),
        { status: 400 }
      );

    const bank = await Bank.create({ name, logo });
    return new Response(JSON.stringify(bank), { status: 201 });
  } catch (error) {
    console.error("Error adding bank:", error);
    return new Response(JSON.stringify({ error: "Failed to add bank" }), {
      status: 500,
    });
  }
}

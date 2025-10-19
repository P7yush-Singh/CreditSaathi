import {connectDB} from "@/lib/db";
import Bank from "@/models/Bank";

export async function GET() {
  try {
    await connectDB();
    console.log("Database connected successfully");
    const banks = await Bank.find().sort({ name: 1 });
    return new Response(JSON.stringify(banks), { status: 200 });
  } catch (error) {
    console.error("Error fetching banks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch banks" }), {
      status: 500,
    });
  }
}

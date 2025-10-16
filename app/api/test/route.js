// Create a test route to check database is connected or not
import { connectDB } from "@/lib/db";

export async function GET() {
    await connectDB();
    return Response.json({ message: "Database connected successfully" });
}
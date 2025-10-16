import { connectDB } from "@/utils/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const existing = await Admin.findOne({ email });
    if (existing) return new Response("Admin already exists", { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashed });

    return new Response(JSON.stringify({ message: "Admin created" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Error creating admin", { status: 500 });
  }
}

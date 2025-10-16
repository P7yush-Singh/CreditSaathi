import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function GET() {
  await connectDB();

  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession) {
    return new Response(JSON.stringify({ loggedIn: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const admin = await Admin.findById(adminSession.value);
  if (!admin) {
    return new Response(JSON.stringify({ loggedIn: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ loggedIn: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

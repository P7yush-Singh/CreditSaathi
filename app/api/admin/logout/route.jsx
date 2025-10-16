import { serialize } from "cookie";

export async function POST() {
  // Delete the session cookie
  const cookie = serialize("admin_session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return new Response(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}

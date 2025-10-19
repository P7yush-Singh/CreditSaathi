// app/api/user/logout/route.js
import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("user_session", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "lax",
  });

  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}

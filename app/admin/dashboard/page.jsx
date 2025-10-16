import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import Link from "next/link";


export default async function AdminDashboard() {
  await connectDB();

  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session");

  // Redirect if not logged in
  if (!adminSession) {
    redirect("/admin/login");
  }

  const admin = await Admin.findById(adminSession.value).lean();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Link
  href="/admin/add-card"
  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 m-2"
>
  Add Card
</Link>

<Link
  href="/admin/manage-cards"
  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 m-2"
>
  Manage Cards
</Link>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Welcome, {admin.email}
        </h1>
        <p className="text-gray-700 text-center mb-6">
          You are logged in to the Credit Saathi Admin Dashboard.
        </p>

        <div className="flex justify-center">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

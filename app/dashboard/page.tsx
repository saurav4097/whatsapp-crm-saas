import Link from "next/link";

import { cookies }
from "next/headers";

import { verifySession }
from "@/lib/auth";

async function getLeads(
  sessionToken: string
) {

  const res = await fetch(
    "http://localhost:3000/api/leads",
    {
      cache: "no-store",

      headers: {
        Cookie:
          `session=${sessionToken}`,
      },
    }
  );

  const data =
    await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

export default async function DashboardPage() {

  const cookieStore =
    await cookies();

  const session =
    cookieStore.get("session");

  // NOT LOGGED IN

  if (!session) {

    return (

      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-6">

        <div className="bg-slate-900 p-10 rounded-2xl text-center max-w-md w-full">

          <h1 className="text-3xl font-bold mb-4">

            Dashboard Locked

          </h1>

          <p className="text-gray-400 mb-8">

            You are not logged in.
            Please login to access your dashboard.

          </p>

          <Link
            href="/login"
            className="bg-green-500 px-6 py-3 rounded-xl inline-block"
          >
            Login
          </Link>

        </div>

      </main>
    );
  }

  // VERIFY SESSION

  const payload =
    await verifySession(
      session.value
    );

  if (!payload) {

    return (

      <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white p-6">

        <div className="bg-slate-900 p-10 rounded-2xl text-center max-w-md w-full">

          <h1 className="text-3xl font-bold mb-4">

            Invalid Session

          </h1>

          <p className="text-gray-400 mb-8">

            Your session expired.
            Please login again.

          </p>

          <Link
            href="/login"
            className="bg-green-500 px-6 py-3 rounded-xl inline-block"
          >
            Login Again
          </Link>

        </div>

      </main>
    );
  }

  // FETCH LEADS

  const leads =
    await getLeads(
      session.value
    );

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <form
          action="/api/logout"
          method="POST"
        >

          <button
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </form>

      </div>

      <div className="space-y-4">

        {leads.length === 0 && (

          <div className="bg-slate-900 p-6 rounded-xl">

            <p>
              No leads yet.
            </p>

          </div>
        )}

        {leads.map((lead: any) => (

          <div
            key={lead.id}
            className="bg-slate-900 p-4 rounded-xl"
          >

            <p className="font-bold">
              {lead.phone}
            </p>

            <p className="text-gray-400">
              {lead.lastMessage}
            </p>

            <p className="text-green-400">
              {lead.status}
            </p>

          </div>
        ))}

      </div>

    </main>
  );
}
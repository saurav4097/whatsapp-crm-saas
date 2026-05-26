import Link from "next/link";

import { cookies }
from "next/headers";

import { verifySession }
from "@/lib/auth";

async function getLeads(
  sessionToken: string
) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/leads`,
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

        <div className="bg-slate-900 p-10 rounded-3xl text-center max-w-md w-full border border-slate-800">

          <h1 className="text-4xl font-bold mb-4">
            Dashboard Locked
          </h1>

          <p className="text-gray-400 mb-8">
            Login to access your coaching leads dashboard.
          </p>

          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-2xl inline-block font-semibold"
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

        <div className="bg-slate-900 p-10 rounded-3xl text-center max-w-md w-full border border-slate-800">

          <h1 className="text-4xl font-bold mb-4">
            Session Expired
          </h1>

          <p className="text-gray-400 mb-8">
            Please login again.
          </p>

          <Link
            href="/login"
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-2xl inline-block font-semibold"
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

  // ANALYTICS

  const totalLeads =
    leads.length;

  const hotLeads =
    leads.filter(
      (lead: any) =>
        lead.status === "hot"
    ).length;

  const interestedLeads =
    leads.filter(
      (lead: any) =>
        lead.status === "interested"
    ).length;

  const newLeads =
    leads.filter(
      (lead: any) =>
        lead.status === "new"
    ).length;

  return (

    <main className="min-h-screen bg-slate-950 text-white p-8">

      {/* TOP */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            LeadPilot
          </h1>

          <p className="text-gray-400 mt-2">
            AI Student Lead Dashboard
          </p>

        </div>

        <form
          action="/api/logout"
          method="POST"
        >

          <button
            className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl font-semibold"
          >
            Logout
          </button>

        </form>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            Total Student Leads
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {totalLeads}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            New Leads
          </p>

          <h2 className="text-5xl font-bold mt-3 text-blue-400">
            {newLeads}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            Interested Students
          </p>

          <h2 className="text-5xl font-bold mt-3 text-yellow-400">
            {interestedLeads}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            Hot Leads
          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-400">
            {hotLeads}
          </h2>

        </div>

      </div>

      {/* LEADS */}

      <div className="space-y-5">

        {leads.length === 0 && (

          <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl text-center">

            <h2 className="text-2xl font-bold mb-2">
              No Leads Yet
            </h2>

            <p className="text-gray-400">
              Student conversations will appear here automatically.
            </p>

          </div>
        )}

        {leads.map((lead: any) => (

          <div
            key={lead.id}
            className="bg-slate-900 border border-slate-800 hover:border-green-500 transition rounded-3xl p-6"
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT */}

              <div className="space-y-4 flex-1">

                <div>

                  <p className="text-sm text-gray-500">
                    Student WhatsApp
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    {lead.phone}
                  </h2>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Last Student Message
                  </p>

                  <p className="text-white mt-1">
                    {lead.lastMessage}
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-w-[350px]">

                <div className="bg-slate-800 rounded-2xl p-4">

                  <p className="text-sm text-gray-400 mb-2">
                    Interested Course
                  </p>

                  <h3 className="text-xl font-bold text-green-400">
                    {lead.courseInterested}
                  </h3>

                </div>

                <div className="bg-slate-800 rounded-2xl p-4">

                  <p className="text-sm text-gray-400 mb-2">
                    Lead Stage
                  </p>

                  <h3 className="text-xl font-bold text-yellow-400 capitalize">
                    {lead.status}
                  </h3>

                </div>

                <div className="bg-slate-800 rounded-2xl p-4">

                  <p className="text-sm text-gray-400 mb-2">
                    Interest Level
                  </p>

                  <h3 className="text-xl font-bold text-blue-400">
                    {lead.interestLevel}
                  </h3>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}
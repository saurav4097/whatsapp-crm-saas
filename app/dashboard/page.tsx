export const dynamic = "force-dynamic";

import Link from "next/link";

import { cookies }
from "next/headers";

import { redirect }
from "next/navigation";

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

  if (!session?.value) {
    redirect("/");
  }

  // VERIFY SESSION

  const payload =
    await verifySession(
      session.value
    );

  if (!payload) {
    redirect("/");
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
        lead.status === "hot" ||
        lead.status === "very hot"
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

    <main className="min-h-screen bg-slate-950 text-white p-5 md:p-8">

      {/* TOP */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">

        <div>

          <h1 className="text-4xl md:text-5xl font-black">

            <span className="text-white">
              Lead
            </span>

            <span className="text-green-500">
              Pilot
            </span>

          </h1>

          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Student Lead Management Dashboard
          </p>

        </div>

        <div className="flex items-center gap-4">

          <Link
            href="/"
            className="border border-slate-700 hover:border-green-500 transition px-5 py-3 rounded-2xl font-semibold"
          >
            Back To Home
          </Link>

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

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            Total Leads
          </p>

          <h2 className="text-5xl font-black mt-3">
            {totalLeads}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            New Students
          </p>

          <h2 className="text-5xl font-black mt-3 text-blue-400">
            {newLeads}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            Interested Students
          </p>

          <h2 className="text-5xl font-black mt-3 text-yellow-400">
            {interestedLeads}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <p className="text-gray-400 text-sm">
            Hot Leads
          </p>

          <h2 className="text-5xl font-black mt-3 text-green-400">
            {hotLeads}
          </h2>

        </div>

      </div>

      {/* LEADS */}

      <div className="space-y-6">

        {leads.length === 0 && (

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

            <h2 className="text-2xl font-bold mb-3">
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

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

              {/* LEFT */}

              <div className="flex-1">

                {/* PHONE */}

                <div className="flex items-center gap-4 mb-6">

                  <div className="h-14 w-14 rounded-full bg-green-500 text-black font-black flex items-center justify-center text-lg">

                    {lead.phone.slice(-2)}

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Student WhatsApp
                    </p>

                    <h2 className="text-2xl font-bold break-all">
                      {lead.phone}
                    </h2>

                  </div>

                </div>

                {/* MESSAGE */}

                <div className="mb-5">

                  <p className="text-sm text-gray-500 mb-2">
                    Last Student Message
                  </p>

                  <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">

                    <p className="text-white leading-relaxed break-words">
                      {lead.lastMessage}
                    </p>

                  </div>

                </div>

                {/* EXTRA */}

                <div className="flex flex-wrap gap-3">

                  <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm border border-slate-700">

                    Messages:
                    <span className="text-green-400 ml-2 font-bold">
                      {lead.totalMessages}
                    </span>

                  </div>

                  <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm border border-slate-700">

                    Status:
                    <span className="text-yellow-400 ml-2 capitalize font-bold">
                      {lead.status}
                    </span>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:w-[360px]">

                {/* COURSE */}

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

                  <p className="text-sm text-gray-400 mb-3">
                    Interested Course
                  </p>

                  <h3 className="text-xl font-black text-green-400 break-words">

                    {lead.courseInterested}

                  </h3>

                </div>

                {/* STAGE */}

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

                  <p className="text-sm text-gray-400 mb-3">
                    Lead Stage
                  </p>

                  <h3 className="text-xl font-black text-yellow-400 capitalize">

                    {lead.status}

                  </h3>

                </div>

                {/* INTEREST */}

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

                  <p className="text-sm text-gray-400 mb-3">
                    Interest Level
                  </p>

                  <h3 className="text-xl font-black text-blue-400">

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
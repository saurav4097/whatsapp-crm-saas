import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* BACKGROUND EFFECT */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-3xl rounded-full" />

      </div>

      {/* NAVBAR */}

      <header className="relative z-10 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight">

              <span className="text-white">
                Lead
              </span>

              <span className="text-green-500">
                Pilot
              </span>

            </h1>

          </div>

          <Link
            href="/dashboard"
            className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-2xl font-semibold text-black"
          >
            Dashboard
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full mb-8">

              <div className="h-2 w-2 rounded-full bg-green-500" />

              <p className="text-sm text-gray-300">

                Meta WhatsApp Automation Platform

              </p>

            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">

              Never Lose
              <br />

              <span className="text-green-500">
                Student Leads
              </span>

            </h1>

            <p className="text-gray-400 text-lg md:text-xl mt-8 leading-relaxed max-w-2xl">

              LeadPilot helps coaching centers automate WhatsApp inquiries,
              capture every student lead, and convert more admissions using
              smart Meta automation workflows.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-5 mt-10">

              <Link
                href="/dashboard"
                className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl font-bold text-black text-center"
              >
                Open Dashboard
              </Link>

              

            </div>

            {/* SMALL STATS */}

            <div className="flex flex-wrap gap-8 mt-14">

              <div>

                <h2 className="text-4xl font-black text-green-500">
                  24/7
                </h2>

                <p className="text-gray-400 mt-2">
                  Automated Replies
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-green-500">
                  Meta
                </h2>

                <p className="text-gray-400 mt-2">
                  WhatsApp Connected
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-green-500">
                  CRM
                </h2>

                <p className="text-gray-400 mt-2">
                  Student Lead Tracking
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 shadow-2xl">

              {/* CHAT HEADER */}

              <div className="flex items-center gap-4 border-b border-slate-800 pb-5">

                <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-xl">

                  LP

                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    LeadPilot
                  </h3>

                  <p className="text-green-400 text-sm">
                    Online
                  </p>

                </div>

              </div>

              {/* CHAT */}

              <div className="space-y-5 mt-8">

                <div className="bg-slate-800 rounded-3xl p-5 max-w-[85%]">

                  <p className="text-gray-200">
                    Hii, what is fee for JEE batch?
                  </p>

                </div>

                <div className="bg-green-500 text-black rounded-3xl p-5 ml-auto max-w-[85%]">

                  <p className="font-medium">
                    Our JEE batch fee starts from ₹45,000.

                    We also provide:
                    • Hostel support
                    • Test series
                    • Doubt sessions

                    Which class are you currently in?
                  </p>

                </div>

                <div className="bg-slate-800 rounded-3xl p-5 max-w-[85%]">

                  <p className="text-gray-200">
                    12th pass dropper.
                  </p>

                </div>

                <div className="bg-green-500 text-black rounded-3xl p-5 ml-auto max-w-[85%]">

                  <p className="font-medium">
                    Great 👍

                    Our dropper batch starts from 15 June.

                    Would you like hostel details too?
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="h-14 w-14 rounded-2xl bg-green-500 flex items-center justify-center text-black font-black text-xl mb-6">

              01

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Smart Lead Tracking
            </h3>

            <p className="text-gray-400 leading-relaxed">

              Track every student inquiry, course interest, and conversation stage in one dashboard.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="h-14 w-14 rounded-2xl bg-green-500 flex items-center justify-center text-black font-black text-xl mb-6">

              02

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Meta WhatsApp Automation
            </h3>

            <p className="text-gray-400 leading-relaxed">

              Automatically reply to student questions using connected Meta WhatsApp APIs.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="h-14 w-14 rounded-2xl bg-green-500 flex items-center justify-center text-black font-black text-xl mb-6">

              03

            </div>

            <h3 className="text-2xl font-bold mb-4">
              Convert More Admissions
            </h3>

            <p className="text-gray-400 leading-relaxed">

              Reduce lost inquiries and help counseling teams focus on serious students.

            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-6 items-center justify-between">

          <div>

            <h2 className="text-3xl font-black">

              <span className="text-white">
                Lead
              </span>

              <span className="text-green-500">
                Pilot
              </span>

            </h2>

            <p className="text-gray-500 mt-3 max-w-xl">

              WhatsApp lead automation platform for coaching centers.
              Built to capture more inquiries, automate replies,
              and increase student admissions.

            </p>

          </div>

          <div className="text-gray-500 text-sm">

            © 2026 LeadPilot. All rights reserved.

          </div>

        </div>

      </footer>

    </main>
  );
}
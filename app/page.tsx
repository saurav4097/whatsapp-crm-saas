import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="text-center">

        <h1 className="text-5xl font-bold mb-6">
          WhatsApp Lead CRM
        </h1>

        <p className="text-gray-400 mb-8">
          Automate coaching center inquiries.
        </p>

        <Link
          href="/setup"
          className="bg-green-500 px-6 py-3 rounded-xl"
        >
          Setup Business
        </Link>

      </div>

    </main>
  );
}
"use client";

import { useState }
from "react";

export default function SetupPage() {

  const [step, setStep] =
    useState(1);

  const [formData, setFormData] =
    useState({

      // BUSINESS

      businessName: "",

      email: "",

      whatsappNumber: "",

      accessToken: "",

      phoneNumberId: "",

      // AUTOMATION

      exams: "",

      feeStructure: "",

      batchDates: "",

      hostelInfo: "",

      locationText: "",

      locationLink: "",

      whyJoin: "",

      scholarshipInfo: "",

      contactNumber: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const res = await fetch(
      "/api/setup-business",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          formData
        ),
      }
    );

    const data =
      await res.json();

    console.log(data);

    alert(
      "Business Connected"
    );
  };

  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-2xl space-y-4"
      >

        {/* STEP 1 */}

        {step === 1 && (

          <>

            <h1 className="text-4xl font-bold mb-6">

              Connect Your Business

            </h1>

            <p className="text-gray-400 mb-6">

              Setup your WhatsApp
              automation system.

            </p>

            <input
              name="businessName"
              placeholder="Business Name"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <input
              name="whatsappNumber"
              placeholder="WhatsApp Number"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <input
              name="accessToken"
              placeholder="Meta Access Token"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <input
              name="phoneNumberId"
              placeholder="Phone Number ID"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() =>
                setStep(2)
              }
              className="bg-green-500 w-full p-4 rounded-lg"
            >

              Next

            </button>

          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (

          <>

            <h1 className="text-4xl font-bold mb-4">

              Automation Details

            </h1>

            <p className="text-gray-400 mb-6">

              Add details to help
              our automation system
              respond better and
              connect personally
              with students.

            </p>

            <textarea
              name="exams"
              placeholder="Exams & Courses (JEE, NEET, UPSC...)"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <textarea
              name="feeStructure"
              placeholder="Fee Structure"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <textarea
              name="batchDates"
              placeholder="Upcoming Batch Dates"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <textarea
              name="hostelInfo"
              placeholder="Hostel Information"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <textarea
              name="locationText"
              placeholder="Institute Location"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <input
              name="locationLink"
              placeholder="Google Maps Link"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <textarea
              name="whyJoin"
              placeholder="Why Students Should Join"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <textarea
              name="scholarshipInfo"
              placeholder="Scholarship Details"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <input
              name="contactNumber"
              placeholder="Counselor Contact Number"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <button
              className="bg-green-500 w-full p-4 rounded-lg"
            >

              Complete Setup

            </button>

          </>
        )}

      </form>

    </main>
  );
}
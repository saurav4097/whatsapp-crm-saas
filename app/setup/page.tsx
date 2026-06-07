"use client";

import { useState } from "react";

export default function SetupPage() {

  const [step, setStep] =
    useState(1);

  const [formData, setFormData] =
    useState({

      businessName: "",

      businessType: "",

      email: "",

      whatsappNumber: "",

      accessToken: "",

      phoneNumberId: "",

      defaultMessage: "",

      followupMessage: "",

      followupDays: 3,
    });

  const [keywords, setKeywords] =
    useState([
      {
        keyword: "",
        reply: "",
      },
    ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const addKeyword = () => {

    setKeywords([
      ...keywords,
      {
        keyword: "",
        reply: "",
      },
    ]);
  };

  const updateKeyword = (
    index: number,
    field: string,
    value: string
  ) => {

    const updated =
      [...keywords];

    updated[index] = {

      ...updated[index],

      [field]: value,
    };

    setKeywords(updated);
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

        body: JSON.stringify({

          ...formData,

          keywords,
        }),
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

        {step === 1 && (

          <>

            <h1 className="text-4xl font-bold">

              Connect Your Business

            </h1>

            <p className="text-gray-400">

              Connect your WhatsApp
              business account.

            </p>

            <input
              name="businessName"
              placeholder="Business Name"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <select
              name="businessType"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            >

              <option value="">
                Select Business Type
              </option>

              <option value="coaching">
                Coaching
              </option>

              <option value="real_estate">
                Real Estate
              </option>

              <option value="cafe">
                Cafe
              </option>

              <option value="restaurant">
                Restaurant
              </option>

              <option value="gym">
                Gym
              </option>

              <option value="clinic">
                Clinic
              </option>

              <option value="other">
                Other
              </option>

            </select>

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

        {step === 2 && (

          <>

            <h1 className="text-4xl font-bold">

              Configure Automation

            </h1>

            <p className="text-gray-400">

              Add automatic replies
              for common customer
              questions.

            </p>

            <textarea
              name="defaultMessage"
              placeholder="Default Reply"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <textarea
              name="followupMessage"
              placeholder="Followup Message"
              className="w-full p-4 rounded-lg bg-slate-800 h-24"
              onChange={handleChange}
            />

            <input
              name="followupDays"
              type="number"
              placeholder="Followup After Days"
              className="w-full p-4 rounded-lg bg-slate-800"
              onChange={handleChange}
            />

            <h2 className="text-xl font-bold">

              Keywords & Replies

            </h2>

            {keywords.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="border border-slate-700 rounded-lg p-4 space-y-3"
                >

                  <input
                    placeholder="Keyword"
                    className="w-full p-3 rounded-lg bg-slate-800"
                    value={item.keyword}
                    onChange={(e) =>
                      updateKeyword(
                        index,
                        "keyword",
                        e.target.value
                      )
                    }
                  />

                  <textarea
                    placeholder="Reply"
                    className="w-full p-3 rounded-lg bg-slate-800 h-24"
                    value={item.reply}
                    onChange={(e) =>
                      updateKeyword(
                        index,
                        "reply",
                        e.target.value
                      )
                    }
                  />

                </div>
              )
            )}

            <button
              type="button"
              onClick={addKeyword}
              className="bg-slate-700 px-4 py-2 rounded-lg"
            >

              + Add Keyword

            </button>

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
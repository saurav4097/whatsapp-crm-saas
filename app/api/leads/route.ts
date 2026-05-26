import { prisma } from "@/lib/prisma";

import { cookies }
from "next/headers";

import { verifySession }
from "@/lib/auth";

export async function GET() {

  try {

    // SESSION

    const session =
      (await cookies())
      .get("session");

    if (!session) {

      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // VERIFY

    const payload =
      await verifySession(
        session.value
      );

    if (!payload) {

      return Response.json(
        {
          error: "Invalid session",
        },
        {
          status: 401,
        }
      );
    }

    const businessId =
      payload.businessId as string;

    // GET ALL LEADS

    const allLeads =
      await prisma.lead.findMany({

        where: {
          businessId,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    // GROUP BY PHONE NUMBER

    const groupedLeads:
      Record<string, any[]> = {};

    for (const lead of allLeads) {

      if (
        !groupedLeads[lead.phone]
      ) {

        groupedLeads[
          lead.phone
        ] = [];
      }

      groupedLeads[
        lead.phone
      ].push(lead);
    }

    // FINAL LEADS

    const finalLeads =
      Object.entries(
        groupedLeads
      ).map(([phone, messages]) => {

        // LAST MESSAGE

        const latest =
          messages[0];

        const totalMessages =
          messages.length;

        const fullText =
          messages
            .map((m) =>
              m.lastMessage
              ?.toLowerCase()
            )
            .join(" ");

        // COURSE DETECTION

        let courseInterested =
          "Don't Know Yet";

        if (
          fullText.includes("jee")
        ) {
          courseInterested =
            "JEE";
        }

        else if (
          fullText.includes("neet")
        ) {
          courseInterested =
            "NEET";
        }

        else if (
          fullText.includes("upsc")
        ) {
          courseInterested =
            "UPSC";
        }

        else if (
          fullText.includes("ssc")
        ) {
          courseInterested =
            "SSC";
        }

        // INTEREST LEVEL

        let interestLevel =
          "Low";

        if (
          totalMessages >= 3
        ) {
          interestLevel =
            "Medium";
        }

        if (
          totalMessages >= 6
        ) {
          interestLevel =
            "High";
        }

        // LEAD STAGE

        let status = "new";

        if (
          totalMessages >= 2
        ) {
          status =
            "interested";
        }

        if (
          totalMessages >= 5
        ) {
          status = "hot";
        }

        // SUPER HOT KEYWORDS

        if (
          fullText.includes(
            "admission"
          ) ||

          fullText.includes(
            "join"
          ) ||

          fullText.includes(
            "call me"
          ) ||

          fullText.includes(
            "register"
          )
        ) {

          status = "very hot";

          interestLevel =
            "Very High";
        }

        return {

          id: latest.id,

          phone,

          totalMessages,

          lastMessage:
            latest.lastMessage,

          createdAt:
            latest.createdAt,

          status,

          interestLevel,

          courseInterested,
        };
      });

    return Response.json(
      finalLeads
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}
import { prisma } from "@/lib/prisma";

import { cookies }
from "next/headers";

import { verifySession }
from "@/lib/auth";

export async function GET() {

  try {

    // GET SESSION

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

    // VERIFY SESSION

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

    // GET LEADS

    const leads =
      await prisma.lead.findMany({

        where: {
          businessId,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    // SMART LEAD SYSTEM

    const formattedLeads =
      leads.map((lead: any) => {

        const msg =
          lead.lastMessage
          ?.toLowerCase() || "";

        let status = "new";
        let interestLevel = "Medium";
        let courseInterested =
          "Don't Know Yet";

        // COURSE DETECTION

        if (
          msg.includes("jee")
        ) {
          courseInterested =
            "JEE";
        }

        else if (
          msg.includes("neet")
        ) {
          courseInterested =
            "NEET";
        }

        else if (
          msg.includes("upsc")
        ) {
          courseInterested =
            "UPSC";
        }

        else if (
          msg.includes("ssc")
        ) {
          courseInterested =
            "SSC";
        }

        // HOT LEAD DETECTION

        if (
          msg.includes("admission") ||
          msg.includes("join") ||
          msg.includes("register") ||
          msg.includes("call")
        ) {

          status = "hot";
          interestLevel = "High";
        }

        // INTERESTED

        else if (
          msg.includes("fee") ||
          msg.includes("fees") ||
          msg.includes("batch") ||
          msg.includes("hostel") ||
          msg.includes("course")
        ) {

          status = "interested";
          interestLevel = "Medium";
        }

        // LOW INTEREST

        else {

          status = "new";
          interestLevel = "Low";
        }

        return {

          id: lead.id,

          phone: lead.phone,

          lastMessage:
            lead.lastMessage,

          createdAt:
            lead.createdAt,

          status,

          interestLevel,

          courseInterested,
        };
      });

    return Response.json(
      formattedLeads
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
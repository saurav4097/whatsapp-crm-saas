import { prisma }
from "@/lib/prisma";

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
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // VERIFY TOKEN

    const payload =
      await verifySession(
        session.value
      );

    if (!payload) {

      return Response.json(
        {
          error:
            "Invalid session",
        },
        {
          status: 401,
        }
      );
    }

    const businessId =
      payload.businessId as string;

    // FETCH ONLY BUSINESS LEADS

    const leads =
      await prisma.lead.findMany({

        where: {
          businessId,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(
      leads
    );

  } catch (error) {

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
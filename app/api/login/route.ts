import { prisma }
from "@/lib/prisma";

import { SignJWT }
from "jose";

import { cookies }
from "next/headers";

const secret =
  new TextEncoder().encode(
    "supersecretkey"
  );

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const business =
      await prisma.business.findFirst({

        where: {

          businessName:
            body.businessName,

          email:
            body.email,

          whatsappNumber:
            body.whatsappNumber,
        },
      });

    if (!business) {

      return Response.json(
        {
          error:
            "Business not found. Please setup first.",
        },
        {
          status: 401,
        }
      );
    }

    // CREATE TOKEN

    const token =
      await new SignJWT({

        businessId:
          business.id,
      })

      .setProtectedHeader({
        alg: "HS256",
      })

      .setExpirationTime("30d")

      .sign(secret);

    // STORE COOKIE

    (await cookies()).set(
      "session",
      token,
      {
        httpOnly: true,

        secure: false,

        maxAge:
          60 * 60 * 24 * 30,

        path: "/",
      }
    );

    return Response.json({
      success: true,
    });

  } catch (error) {

    return Response.json(
      {
        error:
          "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}
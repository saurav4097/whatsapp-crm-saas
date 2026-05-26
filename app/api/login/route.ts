import { prisma }
from "@/lib/prisma";

import { SignJWT }
from "jose";

import { cookies }
from "next/headers";

const secret =
  new TextEncoder().encode(
    process.env.JWT_SECRET ||
    "supersecretkey"
  );

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const businessName =
      body.businessName?.trim();

    const email =
      body.email?.trim();

    const whatsappNumber =
      body.whatsappNumber?.trim();

    // VALIDATION

    if (
      !businessName ||
      !email ||
      !whatsappNumber
    ) {

      return Response.json(
        {
          error:
            "Please fill all fields",
        },
        {
          status: 400,
        }
      );
    }

    // FIND BUSINESS

    const business =
      await prisma.business.findFirst({

        where: {

          businessName,

          email,

          whatsappNumber,
        },
      });

    // NOT FOUND

    if (!business) {

      return Response.json(
        {
          error:
            "Business not found. Please check details.",
        },
        {
          status: 401,
        }
      );
    }

    // CREATE JWT

    const token =
      await new SignJWT({

        businessId:
          business.id,
      })

      .setProtectedHeader({
        alg: "HS256",
      })

      .setIssuedAt()

      .setExpirationTime(
        "30d"
      )

      .sign(secret);

    // SAVE COOKIE

    (await cookies()).set(
      "session",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 24 * 30,
      }
    );

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

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
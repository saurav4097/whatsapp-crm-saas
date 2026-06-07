import { prisma } from "@/lib/prisma";

import { sendWhatsAppMessage }
from "@/lib/whatsapp";

import { generateReply }
from "@/services/automation";


// ==========================
// VERIFY WEBHOOK
// ==========================

export async function GET(
  req: Request
) {

  const { searchParams } =
    new URL(req.url);

  const mode =
    searchParams.get("hub.mode");

  const token =
    searchParams.get("hub.verify_token");

  const challenge =
    searchParams.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token ===
      process.env
        .WHATSAPP_VERIFY_TOKEN
  ) {

    return new Response(
      challenge || "Verified",
      {
        status: 200,
      }
    );
  }

  return new Response(
    "Verification failed",
    {
      status: 403,
    }
  );
}


// ==========================
// RECEIVE MESSAGES
// ==========================

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    console.log(
      JSON.stringify(
        body,
        null,
        2
      )
    );

    // MESSAGE OBJECT

    const message =
      body?.entry?.[0]
      ?.changes?.[0]
      ?.value?.messages?.[0];

    if (!message) {

      return Response.json({
        success: true,
      });
    }

    // USER MESSAGE

    const incomingText =
      message.text?.body || "";

    // CUSTOMER NUMBER

    const from =
      message.from;

    // BUSINESS PHONE NUMBER ID

    const phoneNumberId =
      body?.entry?.[0]
      ?.changes?.[0]
      ?.value?.metadata
      ?.phone_number_id;

    // FIND BUSINESS

    const business =
      await prisma.business.findFirst({

        where: {
          phoneNumberId,
        },
      });

    if (!business) {

      return Response.json(
        {
          error:
            "Business not found",
        },
        {
          status: 404,
        }
      );
    }

    // SAVE / UPDATE LEAD

    await prisma.lead.upsert({

      where: {

        businessId_phone: {

          businessId:
            business.id,

          phone: from,
        },
      },

      update: {

        lastMessage:
          incomingText,

        status:
          "active",

        followupSent:
          false,

        lastInteractionAt:
          new Date(),
      },

      create: {

        businessId:
          business.id,

        phone: from,

        lastMessage:
          incomingText,

        status:
          "new",

        followupSent:
          false,

        lastInteractionAt:
          new Date(),
      },
    });

    // GENERATE REPLY

    const reply =
      await generateReply({

        businessId:
          business.id,

        message:
          incomingText,
      });

    // SEND REPLY

    await sendWhatsAppMessage({

      accessToken:
        business.accessToken,

      phoneNumberId:
        business.phoneNumberId,

      to: from,

      message: reply,
    });

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(
      "WEBHOOK ERROR:",
      error
    );

    return Response.json(
      {
        error:
          "Webhook Error",
      },
      {
        status: 500,
      }
    );
  }
}
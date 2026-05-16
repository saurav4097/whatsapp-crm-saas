import { prisma } from "@/lib/prisma";

import { sendWhatsAppMessage }
from "@/lib/whatsapp";

import { generateReply }
from "@/services/automation";


// VERIFY WEBHOOK

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
    token === "myverifytoken"
  ) {

    return new Response(challenge, {
      status: 200,
    });
  }

  return new Response(
    "Verification failed",
    {
      status: 403,
    }
  );
}


// RECEIVE MESSAGES

export async function POST(
  req: Request
) {

  try {

    const body = await req.json();

    console.log(
      JSON.stringify(body, null, 2)
    );

    const message =
      body?.entry?.[0]
      ?.changes?.[0]
      ?.value?.messages?.[0];

    if (!message) {

      return Response.json({
        success: true,
      });
    }

    const incomingText =
      message.text?.body || "";

    const from =
      message.from;

    // WHICH BUSINESS RECEIVED MESSAGE?

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

      return Response.json({
        error: "Business not found",
      });
    }

    // GENERATE REPLY

    const reply =
  await generateReply({

    businessId:
      business.id,

    message:
      incomingText,
  });
    // SAVE LEAD

    await prisma.lead.create({

      data: {

        businessId:
          business.id,

        phone: from,

        lastMessage:
          incomingText,

        status: "new",
      },
    });

    // SEND WHATSAPP MESSAGE

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

    console.log(error);

    return Response.json(
      {
        error: "Webhook Error",
      },
      {
        status: 500,
      }
    );
  }
}
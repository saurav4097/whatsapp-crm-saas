import { prisma } from "@/lib/prisma";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export async function runFollowups() {

  const leads = await prisma.lead.findMany({

    where: {
      followupSent: false,
    },

    include: {

      business: {
        include: {
          config: true,
        },
      },
    },
  });

  for (const lead of leads) {

    const config =
      lead.business.config;

    if (!config) continue;

    const lastInteraction =
      new Date(
        lead.lastInteractionAt
      );

    const now =
      new Date();

    const differenceInDays =
      Math.floor(
        (
          now.getTime() -
          lastInteraction.getTime()
        ) /
        (1000 * 60 * 60 * 24)
      );

    if (
      differenceInDays >=
      config.followupDays
    ) {

      try {

        await sendWhatsAppMessage({

          accessToken:
            lead.business
              .accessToken,

          phoneNumberId:
            lead.business
              .phoneNumberId,

          to:
            lead.phone,

          message:
            config.followupMessage,
        });

        await prisma.lead.update({

          where: {
            id: lead.id,
          },

          data: {
            followupSent: true,
          },
        });

        console.log(
          `Followup sent to ${lead.phone}`
        );

      } catch (error) {

        console.log(
          "FOLLOWUP ERROR",
          error
        );
      }
    }
  }
}
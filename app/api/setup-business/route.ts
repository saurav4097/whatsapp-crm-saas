import { prisma }
from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const business =
      await prisma.business.create({

        data: {

          businessName:
            body.businessName,

          businessType:
            body.businessType,

          email:
            body.email,

          whatsappNumber:
            body.whatsappNumber,

          accessToken:
            body.accessToken,

          phoneNumberId:
            body.phoneNumberId,
        },
      });

    const config =
      await prisma.businessConfig.create({

        data: {

          businessId:
            business.id,

          defaultMessage:
            body.defaultMessage,

          followupMessage:
            body.followupMessage,

          followupDays:
            Number(
              body.followupDays
            ),
        },
      });

    if (
      body.keywords &&
      body.keywords.length > 0
    ) {

      await prisma.keywordReply.createMany({

        data:

          body.keywords.map(
            (item: any) => ({

              configId:
                config.id,

              keyword:
                item.keyword,

              reply:
                item.reply,
            })
          ),
      });
    }

    return Response.json({

      success: true,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Setup failed",
      },
      {
        status: 500,
      }
    );
  }
}
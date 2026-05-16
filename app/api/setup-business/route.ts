import { prisma }
from "@/lib/prisma";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    // CREATE BUSINESS

    const business =
      await prisma.business.create({

        data: {

          businessName:
            body.businessName,

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

    // CREATE CONFIG

    await prisma.coachingConfig.create({

      data: {

        businessId:
          business.id,

        exams:
          body.exams,

        feeStructure:
          body.feeStructure,

        batchDates:
          body.batchDates,

        hostelInfo:
          body.hostelInfo,

        locationText:
          body.locationText,

        locationLink:
          body.locationLink,

        whyJoin:
          body.whyJoin,

        scholarshipInfo:
          body.scholarshipInfo,

        contactNumber:
          body.contactNumber,
      },
    });

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
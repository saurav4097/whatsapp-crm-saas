import { prisma }
from "@/lib/prisma";

export async function generateReply({

  businessId,

  message,

}: {
  businessId: string;
  message: string;
}) {

  const config =
    await prisma.coachingConfig.findUnique({

      where: {
        businessId,
      },
    });

  if (!config) {

    return "Configuration not found.";
  }

  const lower =
    message.toLowerCase();

  // FEES

  if (
    lower.includes("fee")
  ) {

    return `💰 Fee Structure:\n\n${config.feeStructure}`;
  }

  // COURSES

  if (
    lower.includes("course") ||
    lower.includes("jee") ||
    lower.includes("neet") ||
    lower.includes("upsc")
  ) {

    return `📚 Courses & Exams:\n\n${config.exams}`;
  }

  // BATCH

  if (
    lower.includes("batch")
  ) {

    return `📅 Upcoming Batches:\n\n${config.batchDates}`;
  }

  // HOSTEL

  if (
    lower.includes("hostel")
  ) {

    return `🏠 Hostel Information:\n\n${config.hostelInfo}`;
  }

  // LOCATION

  if (
    lower.includes("location") ||
    lower.includes("address")
  ) {

    return `📍 Location:\n\n${config.locationText}\n\n${config.locationLink}`;
  }

  // SCHOLARSHIP

  if (
    lower.includes("scholarship")
  ) {

    return `🎓 Scholarship Information:\n\n${config.scholarshipInfo}`;
  }

  // WHY JOIN

  if (
    lower.includes("why")
  ) {

    return `🚀 Why Join Us:\n\n${config.whyJoin}`;
  }

  // DEFAULT

  return `Hi 👋

Welcome to our institute.

You can ask about:

• Courses
• Fees
• Batch Dates
• Hostel
• Scholarship
• Location

Or contact our counselor:

${config.contactNumber}`;
}
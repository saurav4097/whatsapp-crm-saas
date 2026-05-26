import { prisma } from "@/lib/prisma";

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
    lower.includes("fee") ||
    lower.includes("fees") ||
    lower.includes("price") ||
    lower.includes("cost")
  ) {

    return `💰 Fee Structure

${config.feeStructure}

You can also ask about:

• Courses
• Scholarship
• Hostel
• Batch Dates

Type what you want to know 😊`;
  }

  // COURSES

  if (
    lower.includes("course") ||
    lower.includes("courses") ||
    lower.includes("jee") ||
    lower.includes("neet") ||
    lower.includes("upsc") ||
    lower.includes("iit") ||
    lower.includes("exam")
  ) {

    return `📚 Courses We Offer

${config.exams}

You can also ask:

• Fee structure
• Batch timings
• Scholarship
• Hostel facility

Reply with your question 👇`;
  }

  // BATCH

  if (
    lower.includes("batch") ||
    lower.includes("timing") ||
    lower.includes("class")
  ) {

    return `📅 Upcoming Batches

${config.batchDates}

Want more details?

• Fees
• Courses
• Hostel
• Scholarship

Just type your query 😊`;
  }

  // HOSTEL

  if (
    lower.includes("hostel") ||
    lower.includes("room") ||
    lower.includes("stay")
  ) {

    return `🏠 Hostel Information

${config.hostelInfo}

You can also ask about:

• Food facility
• Fees
• Courses
• Batch dates

Type your next question 😊`;
  }

  // LOCATION

  if (
    lower.includes("location") ||
    lower.includes("address") ||
    lower.includes("where") ||
    lower.includes("map")
  ) {

    return `📍 Institute Location

${config.locationText}

Map Link:
${config.locationLink}

Need help with:

• Courses
• Fees
• Hostel
• Scholarship

Type anytime 😊`;
  }

  // SCHOLARSHIP

  if (
    lower.includes("scholarship") ||
    lower.includes("discount") ||
    lower.includes("offer")
  ) {

    return `🎓 Scholarship Information

${config.scholarshipInfo}

You can also ask about:

• Fees
• Hostel
• Courses
• Batch dates

Reply with your next question 😊`;
  }

  // WHY JOIN

  if (
    lower.includes("why") ||
    lower.includes("best") ||
    lower.includes("choose") ||
    lower.includes("join")
  ) {

    return `🚀 Why Students Choose Us

${config.whyJoin}

Want to know more about:

• Results
• Courses
• Fees
• Hostel

Ask anything 😊`;
  }

  // RESULTS

  if (
    lower.includes("result") ||
    lower.includes("selection") ||
    lower.includes("rank")
  ) {

    return `🏆 Our Student Results

${config.whyJoin}

Students trust us for quality teaching and guidance.

You can also ask about:

• Fees
• Courses
• Hostel
• Scholarship`;
  }

  // FACULTY

  if (
    lower.includes("teacher") ||
    lower.includes("faculty") ||
    lower.includes("mentor")
  ) {

    return `👨‍🏫 Faculty Information

Our experienced faculty members guide students personally for better results.

You can also ask about:

• Courses
• Fees
• Batch dates
• Hostel`;
  }

  // DEMO CLASS

  if (
    lower.includes("demo") ||
    lower.includes("trial") ||
    lower.includes("sample")
  ) {

    return `🎥 Demo Classes

Yes 😊 Demo classes may be available for selected batches.

Please contact our counselor for details:

📞 ${config.contactNumber}

You can also ask about:

• Fees
• Courses
• Scholarship`;
  }

  // GREETING

  if (
    lower.includes("hi") ||
    lower.includes("hello") ||
    lower.includes("hii") ||
    lower.includes("hey")
  ) {

    return `Hi 👋

Welcome to our institute 😊

${config.whyJoin}

You can ask about:

📚 Courses
💰 Fees
📅 Batch Dates
🏠 Hostel
🎓 Scholarship
📍 Location

Type your question anytime 😊`;
  }

  // DEFAULT

  return `Hi 👋

Thank you for contacting us 😊

You can ask about:

📚 Courses
💰 Fees
📅 Batch Dates
🏠 Hostel
🎓 Scholarship
📍 Location
🏆 Results
👨‍🏫 Faculty

Or contact our counselor directly:

📞 ${config.contactNumber}

Please type your question 😊`;
}
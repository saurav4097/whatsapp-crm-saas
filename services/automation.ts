import { prisma } from "@/lib/prisma";

export async function generateReply({
  businessId,
  message,
}: {
  businessId: string;
  message: string;
}) {

  const config =
    await prisma.businessConfig.findUnique({

      where: {
        businessId,
      },

      include: {
        keywordReplies: true,
      },
    });

  if (!config) {

    return "Configuration not found.";
  }

  const lower =
    message.toLowerCase();

  // GREETING

  const greetings = [

    "hi",
    "hello",
    "hii",
    "hey",
    "good morning",
    "good evening",
  ];

  const isGreeting =
    greetings.some(
      (word) =>
        lower.includes(word)
    );

  if (isGreeting) {

    return config.defaultMessage;
  }

  // KEYWORD MATCH

  for (
    const item
    of config.keywordReplies
  ) {

    const keyword =
      item.keyword.toLowerCase();

    if (
      lower.includes(keyword)
    ) {

      return item.reply;
    }
  }

  // DEFAULT MESSAGE

  return config.defaultMessage;
}
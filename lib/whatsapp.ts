import axios from "axios";

export async function sendWhatsAppMessage({

  accessToken,
  phoneNumberId,
  to,
  message,

}: {
  accessToken: string;
  phoneNumberId: string;
  to: string;
  message: string;
}) {

  try {

    const response = await axios.post(

      `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,

      {
        messaging_product: "whatsapp",

        to,

        type: "text",

        text: {
          body: message,
        },
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,

          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);

    throw error;
  }
}
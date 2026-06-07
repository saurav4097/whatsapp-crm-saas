import { runFollowups }
from "@/services/followup";

export async function GET(
  req: Request
) {

  const authHeader =
    req.headers.get(
      "authorization"
    );

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {

    return new Response(
      "Unauthorized",
      {
        status: 401,
      }
    );
  }

  try {

    await runFollowups();

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Followup failed",
      },
      {
        status: 500,
      }
    );
  }
}
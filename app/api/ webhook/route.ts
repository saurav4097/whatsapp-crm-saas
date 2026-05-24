export async function GET(req: Request) {

  const { searchParams } =
    new URL(req.url);

  const challenge =
    searchParams.get("hub.challenge");

  return new Response(
    challenge || "working",
    {
      status: 200,
    }
  );
}
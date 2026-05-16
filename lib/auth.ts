import { jwtVerify }
from "jose";

const secret =
  new TextEncoder().encode(
    "supersecretkey"
  );

export async function verifySession(
  token: string
) {

  try {

    const verified =
      await jwtVerify(
        token,
        secret
      );

    return verified.payload;

  } catch (error) {

    return null;
  }
}
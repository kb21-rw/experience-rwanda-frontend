import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return Response.json({ error: "No token" }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return Response.json(payload);
  } catch (error) {
    console.error({ error });
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}

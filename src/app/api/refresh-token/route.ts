export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        cookie: cookieHeader,
      },
      credentials: "include",
    }
  );

  const setCookieHeader = backendRes.headers.get("set-cookie");

  const body = await backendRes.text();

  // 👇 forward Set-Cookie back to browser
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (setCookieHeader) {
    headers["Set-Cookie"] = setCookieHeader;
  }

  return new Response(body, {
    status: backendRes.status,
    headers,
  });
}

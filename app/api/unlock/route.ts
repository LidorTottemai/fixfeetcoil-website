import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword || password !== sitePassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("site-auth", sitePassword, {
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}

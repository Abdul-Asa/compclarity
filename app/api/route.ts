import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reqUrl = request.nextUrl.toString();
  const { searchParams, href } = new URL(request.url);
  const res = new NextResponse();

  const responseBody = {
    status: 200,
    body: "Hello, world!",
    href,
    req: {
      url: reqUrl,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()), // Convert headers to a plain object
    },
    searchParams: Object.fromEntries(searchParams.entries()), // Convert searchParams to a plain object
    res: {
      url: res.url,
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()), // Convert headers to a plain object
    },
  };

  return NextResponse.json(responseBody);
}

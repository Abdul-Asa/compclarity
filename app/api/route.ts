import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const res = NextResponse.
  return {
    status: 200,
    body: "Hello, world!",
    request,
  };
}

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return {
    status: 200,
    body: "Hello, world!",
    request,
    response: NextResponse,
  };
}

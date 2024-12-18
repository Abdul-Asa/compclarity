import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { MAIN_URL } from "@/lib/config/env";

export async function GET(request: NextRequest) {
  let APP_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : MAIN_URL;

  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  
  if (!token_hash || !type) {
    return NextResponse.redirect(APP_URL + "/auth/error?message=Invalid OTP");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  const redirect = NextResponse.redirect(APP_URL + "/auth/sign-in");

  redirect.cookies.set("signin_flow", "true");

  return error
    ? NextResponse.redirect(APP_URL + `/auth/error?message=${error.message || "Invalid OTP"}`)
    : redirect;
}

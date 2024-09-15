"use client";

import Link from "next/link";

export default function PrivacyPolicyLink() {
  return (
    <Link className="hover:underline pl-2" href="/privacy">
      Privacy Policy
    </Link>
  );
}

"use client";

import Link from "next/link";

export default function PrivacyPolicyLink() {
  return (
    <Link className="hover:underline" href="/privacy">
      Privacy Policy
    </Link>
  );
}

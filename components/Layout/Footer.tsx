"use client";
import { FaDiscord, FaLinkedin, FaInstagram, FaXTwitter, FaTiktok, FaBlog } from "react-icons/fa6";
import PrivacyPolicyLink from "../PrivacyPolicyLink";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { ModeToggle } from "./ThemeProvider";

const Footer = () => {
  const trackFooter = (label: string) =>
    sendGAEvent([
      {
        action: "click",
        category: "footer",
        label: label,
      },
    ]);

  return (
    <footer className="w-full border-t-2 border-white dark:border-gray-800 bg-emerald-700 dark:bg-black py-5 text-white">
      <div className="flex flex-col items-center justify-center gap-2 text-base font-thin">
        <div className="mb-2 flex space-x-4">
          <Link
            href="https://discord.gg/AuAvjpTTnm"
            target="_blank"
            onClick={() => trackFooter("discord")}
            aria-label="Discord"
          >
            <FaDiscord size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/compclarity"
            target="_blank"
            onClick={() => trackFooter("linkedin")}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            href="https://www.instagram.com/comp.clarity"
            target="_blank"
            onClick={() => trackFooter("instagram")}
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href="https://compclarity.substack.com"
            target="_blank"
            onClick={() => trackFooter("blog")}
            aria-label="Blog"
          >
            <FaBlog size={24} />
          </Link>
          {/* <Link
            href="https://twitter.com/CompClarity"
            target="_blank"
            onClick={() => trackFooter("twitter")}
            aria-label="Twitter"
          >
            <FaXTwitter size={24} />
          </Link> */}
          {/* <Link
            href="https://www.tiktok.com/@cscareers"
            target="_blank"
            onClick={() => trackFooter("tiktok")}
            aria-label="Tiktok"
          >
            <FaTiktok size={24} />
          </Link> */}
        </div>
        <small>
          &#169; CompClarity 2024 |{" "}
          <a href="mailto:contact@compclarity.com" className="hover:underline" onClick={() => trackFooter("email")}>
            contact@compclarity.com
          </a>{" "}
          |{" "}
          <a href="/employers" className="hover:underline" onClick={() => trackFooter("employers")}>
            Employers
          </a>
        </small>
        <small>
          Logos provided by{" "}
          <Link
            href="https://clearbit.com"
            target="_blank"
            className="hover:underline"
            onClick={() => trackFooter("logo_dev")}
          >
            Clearbit
          </Link>
        </small>
        <small onClick={() => trackFooter("privacy_policy")}>
          <PrivacyPolicyLink />
        </small>
      </div>
    </footer>
  );
};

export default Footer;

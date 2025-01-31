"use client";
import { FaDiscord, FaLinkedin, FaInstagram, FaXTwitter, FaTiktok, FaBlog } from "react-icons/fa6";
import PrivacyPolicyLink from "../tables/PrivacyPolicyLink";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { ModeToggle } from "../providers/ThemeProvider";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t-2 border-border bg-primary dark:bg-black py-5 text-white">
      <div className="flex flex-col items-center justify-center gap-2 text-base font-thin">
        <div className="mb-2 flex space-x-4">
          <Link href="https://discord.gg/AuAvjpTTnm" target="_blank" aria-label="Discord">
            <FaDiscord size={24} />
          </Link>
          <Link href="https://www.linkedin.com/company/compclarity" target="_blank" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </Link>
          <Link href="https://www.instagram.com/comp.clarity" target="_blank" aria-label="Instagram">
            <FaInstagram size={24} />
          </Link>
          {/* <Link
            href="https://twitter.com/CompClarity"
            target="_blank"
            onClick={() => trackFooter("twitter")}
            aria-label="Twitter"
          >
            <FaXTwitter size={24} />
          </Link> */}
          <Link href="https://www.tiktok.com/@cscareers" target="_blank" aria-label="Tiktok">
            <FaTiktok size={24} />
          </Link>
        </div>
        <small className="flex flex-wrap justify-center items-center gap-x-2">
          <span>&#169; CompClarity 2024</span>|
          <a href="/about" className="hover:underline">
            About
          </a>{" "}
          |
          <a href="mailto:contact@compclarity.com" className="hover:underline">
            Contact
          </a>
          |
          <a href="/employers" className="hover:underline">
            Employers
          </a>
          |
          <Button
            onClick={handleScrollToTop}
            onKeyDown={(e) => e.key === "Enter" && handleScrollToTop()}
            className=" border-white/70 hover:border-white transition-colors size-6 rounded-[4px]"
            aria-label="Scroll to top of page"
            title="Go to top"
            size="icon"
            variant={"outline"}
            tabIndex={0}
          >
            <ArrowUp />
          </Button>
        </small>
        <small>
          Logos provided by{" "}
          <Link href="https://clearbit.com" target="_blank" className="hover:underline">
            Clearbit
          </Link>
        </small>
        <small>
          <PrivacyPolicyLink />
        </small>
      </div>
    </footer>
  );
};

export default Footer;

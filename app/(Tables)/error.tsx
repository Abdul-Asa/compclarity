"use client";

import Error from "next/error";
import Link from "next/link";

import { useRouter } from "next/navigation";

interface errorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: errorProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mt-20 flex h-full grow flex-col items-center justify-center">
      <div className="text-4xl sm:text-7xl">Error</div>
      <div className="mt-12 text-xl text-gray-500">
        Page does not exist, click{" "}
        <span
          onClick={handleClick}
          className="cursor-pointer text-blue-600 underline"
        >
          here
        </span>{" "}
        to return.
      </div>
    </div>
  );
};
export default ErrorPage;

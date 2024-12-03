"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Test() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Button onClick={() => setLoading(!loading)}>{loading ? "Loading" : "Not loading"}</Button>
      <Button onClick={() => setLoading(!loading)} size={"sm"}>
        Click me
      </Button>
      <Button onClick={() => setLoading(!loading)} size={"lg"}>
        Click me
      </Button>
      <Button onClick={() => setLoading(!loading)} size={"icon"}>
        Click me
      </Button>
    </div>
  );
}

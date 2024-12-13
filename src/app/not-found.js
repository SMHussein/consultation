"use client";
import "@/src/app/globals.css";
import Error from "next/error";
import Button from "@/src/app/_components/Button";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex justify-center items-center gap-12">
        <Error statusCode={404} />
        <Button className="px-6 text-red" href="/">
          Back to Home
        </Button>
      </body>
    </html>
  );
}

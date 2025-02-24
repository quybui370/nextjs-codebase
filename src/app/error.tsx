"use client"; // Error boundaries must be Client Components

import { Metadata } from "next";
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "Error",
  description: "Error page",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <h1 className="text-2xl font-bold">Something went wrong!</h1>
          <p className="my-2 text-red-500">Error: {error.message}</p>
          <button onClick={() => reset()}>Try again</button>
        </Layout>
      </body>
    </html>
  );
}

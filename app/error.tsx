"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

type RootErrorProps = { error: Error & { digest?: string }; reset: () => void };

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

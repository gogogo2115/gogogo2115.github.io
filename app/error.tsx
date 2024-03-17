"use client"; // Error components must be Client Components

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RootError = ({ error, reset }: ErrorProps) => {
  const { message } = error;

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div>
      <div>에러페이지</div>
      <button title="리셋" onClick={() => reset()}>
        리셋
      </button>
    </div>
  );
};

export default RootError;

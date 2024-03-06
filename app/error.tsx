"use client";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RootError = ({ error, reset }: ErrorProps) => {
  const { message } = error;
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return <>에러페이지</>;
};

export default RootError;

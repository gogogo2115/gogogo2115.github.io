"use client";

import { useStorageTheme } from "@/components/providers/StorageThemeProvider";
import Giscus, { type GiscusProps, type Repo } from "@giscus/react";

const initial: GiscusProps = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO as Repo,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  mapping: "pathname",
  lang: "ko",
};

const GuestbookPage = () => {
  const { curr } = useStorageTheme();
  const giscusTheme = curr.dataset === "gray" ? "noborder_gray" : curr.dataset;

  console.log(curr);

  return (
    <div style={{ width: "80%", margin: "8px auto" }}>
      <Giscus {...initial} theme={giscusTheme} />
    </div>
  );
};

export default GuestbookPage;

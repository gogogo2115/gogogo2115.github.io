"use client";

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
  return (
    <div style={{ width: "80%", margin: "8px auto" }}>
      <Giscus {...initial} />
    </div>
  );
};

export default GuestbookPage;

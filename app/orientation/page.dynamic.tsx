"use client";

import dynamic from "next/dynamic";

const DynamicOrientation = dynamic(() => import("./page.client"), { ssr: false, loading: () => <div>loading</div> });
export default DynamicOrientation;

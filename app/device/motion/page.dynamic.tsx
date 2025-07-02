"use client";

import dynamic from "next/dynamic";

const DynamicDeviceMotion = dynamic(() => import("./page.client"), { ssr: false, loading: () => <div>loading</div> });
export default DynamicDeviceMotion;

"use client";
import dynamic from "next/dynamic";
const ParliosIntelCards = dynamic(() => import("@/components/ParliosIntelCards"), { ssr: false });
export default function Page() {
  const base = process.env.NEXT_PUBLIC_UA_REPO_RAW_BASE || "/api/ua-intel";
  return (<div className="max-w-6xl mx-auto p-6 md:p-10"><ParliosIntelCards baseUrl={base} /></div>);
}

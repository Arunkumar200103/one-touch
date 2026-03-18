"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Search Results</h1>
      <p className="text-gray-500 mt-2">You searched: {query}</p>
    </div>
  );
}
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import SearchResultsClient from "./search-results-client";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading search results...</div>}>
        <SearchResultsClient />
      </Suspense>
    </main>
  );
}

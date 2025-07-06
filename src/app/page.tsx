"use client";

import { useState } from "react";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { QuoteDisplay } from "@/components/ui/QuoteDisplay";
import quotesData from "@/lib/quotes.json";

// Infer the type from quotes.json
type TopicKey = keyof typeof quotesData;

export default function Home() {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = (topic: string) => {
    const normalizedTopic = topic.toLowerCase() as string;

    // Check at runtime if the topic exists in quotesData
    if (!(normalizedTopic in quotesData)) {
      setError("Sorry, this topic is not supported.");
      setQuotes([]);
      return;
    }

    const selectedQuotes = [...quotesData[normalizedTopic as TopicKey]]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setError(null);
    setQuotes(selectedQuotes);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <h1 className="text-3xl font-bold mb-6">💬 Quote Generator</h1>
      <div className="w-full max-w-md">
        <QuoteForm onSubmit={handleGenerate} />
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {quotes.length > 0 && <QuoteDisplay quotes={quotes} />}
      </div>
    </main>
  );
}
interface QuoteDisplayProps {
  quotes: string[];
}

export function QuoteDisplay({ quotes }: QuoteDisplayProps) {
  return (
    <div className="mt-6 space-y-4">
      {quotes.map((quote, index) => (
        <blockquote key={index} className="border-l-4 border-primary pl-4 italic">
          “{quote}”
        </blockquote>
      ))}
    </div>
  );
}
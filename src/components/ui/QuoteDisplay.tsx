import { QuoteIcon, CopyIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Quote {
  text: string;
  author: string;
}

interface QuoteDisplayProps {
  quotes: Quote[];
}

export function QuoteDisplay({ quotes }: QuoteDisplayProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mt-6 space-y-6">
      {quotes.map((quote, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border"
        >
          <QuoteIcon className="absolute top-4 left-4 size-6 text-primary opacity-20" />
          <blockquote className="text-lg italic pl-8">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <div className="mt-4 text-right text-sm text-muted-foreground">
            — {quote.author}
          </div>
          <div className="mt-2 flex justify-end">
            <button
              className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleCopy(quote.text)}
            >
              <CopyIcon className="size-3 mr-1" /> Copy
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
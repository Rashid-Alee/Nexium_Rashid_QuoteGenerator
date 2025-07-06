"use client";

import { useState } from "react";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { QuoteDisplay } from "@/components/ui/QuoteDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import quotesData from "@/lib/quotes.json";
import { motion } from "framer-motion";

type Quote = {
  text: string;
  author: string;
};

type TopicKey = keyof typeof quotesData;

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [normalizedTopic, setNormalizedTopic] = useState<string | null>(null);

  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setNormalizedTopic(null);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const normalized = topic.toLowerCase().trim();
    setNormalizedTopic(normalized);

    if (!(normalized in quotesData)) {
      const availableTopics = Object.keys(quotesData).join(', ');
      setError(`Sorry, this topic is not supported. Try: ${availableTopics}`);
      setQuotes([]);
      setIsLoading(false);
      return;
    }

    const topicQuotes = quotesData[normalized as TopicKey] as Quote[];
    const selectedQuotes = [...topicQuotes]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    setQuotes(selectedQuotes);
    setIsLoading(false);
  };

  const availableTopics = Object.keys(quotesData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-all duration-500">
      <header className="fixed top-0 right-0 z-50 p-4">
        <ThemeToggle />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-24">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 space-y-3"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent tracking-tighter">
                APEX
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent tracking-tighter mt-[-0.5rem]">
                QUOTES
              </span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto pt-2">
              Premium quotes for professionals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-card/80 backdrop-blur-lg rounded-2xl border shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <QuoteForm onSubmit={handleGenerate} />
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                >
                  <p className="text-destructive text-center text-sm">{error}</p>
                </motion.div>
              )}
              
              {normalizedTopic && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 flex flex-wrap gap-2 justify-center"
                >
                  {availableTopics.map(topic => (
                    <span 
                      key={topic}
                      className={`px-3 py-1 rounded-full text-xs transition-colors ${
                        topic === normalizedTopic 
                          ? 'bg-primary text-primary-foreground font-medium' 
                          : 'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </motion.div>
              )}
              
              {isLoading && (
                <div className="mt-6 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="h-4 w-3/4 bg-muted/30 rounded-full animate-pulse"></div>
                      <div className="h-4 w-full bg-muted/30 rounded-full animate-pulse"></div>
                      <div className="h-4 w-5/6 bg-muted/30 rounded-full animate-pulse"></div>
                      <div className="h-4 w-1/3 ml-auto bg-muted/30 rounded-full animate-pulse mt-2"></div>
                    </div>
                  ))}
                </div>
              )}
              
              {quotes.length > 0 && !isLoading && (
                <QuoteDisplay quotes={quotes} />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Available topics:{" "}
              {availableTopics.map((topic, i) => (
                <span key={topic} className="font-medium">
                  {topic}{i < availableTopics.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-6 text-center animate-fade-in"
      >
        <div className="inline-flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            Apex Quotes - Professional Quote Generation System
          </p>
          <div className="flex items-center justify-center mt-2 gap-2">
            {['NextJS', 'Shadcn UI', 'Tailwind CSS'].map((tech, i) => (
              <span 
                key={tech} 
                className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-3">
            © {new Date().getFullYear()} - Built for Nexium Internship by Rashid Ali
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
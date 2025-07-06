"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  topic: z.string().min(2, "Topic must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function QuoteForm({ onSubmit }: { onSubmit: (topic: string) => void }) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  function handleSubmit(values: FormData) {
    onSubmit(values.topic);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter a Topic</FormLabel>
              <FormControl>
                <Input placeholder="e.g., motivation, life, technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Quotes</Button>
      </form>
    </Form>
  );
}
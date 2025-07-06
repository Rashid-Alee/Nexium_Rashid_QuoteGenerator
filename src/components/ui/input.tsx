import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative group">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary-foreground dark:bg-input/20 border-input/70 flex h-10 w-full min-w-0 rounded-xl border bg-transparent px-4 py-2 text-base shadow-sm transition-[box-shadow,transform] duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-transparent focus-visible:translate-y-[-2px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
    </div>
  )
}

export { Input }
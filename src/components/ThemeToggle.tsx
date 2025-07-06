'use client';

import { SunIcon, MoonIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  const getCurrentTheme = () => {
    if (theme === "system") return systemTheme;
    return theme;
  };

  const cycleTheme = () => {
    const themes = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme || "system");
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const getIcon = () => {
    const currentTheme = getCurrentTheme();
    
    switch (theme) {
      case "light":
        return <SunIcon className="h-5 w-5" />;
      case "dark":
        return <MoonIcon className="h-5 w-5" />;
      case "system":
        return <DesktopIcon className="h-5 w-5" />;
      default:
        return currentTheme === "dark" ? 
          <MoonIcon className="h-5 w-5" /> : 
          <SunIcon className="h-5 w-5" />;
    }
  };

  const getTooltipText = () => {
    switch (theme) {
      case "light":
        return "Light theme";
      case "dark":
        return "Dark theme";
      case "system":
        return `System preference (${getCurrentTheme()})`;
      default:
        return "Toggle theme";
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleTheme}
          className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-accent/30 group"
        >
          <div className="transition-transform duration-300 group-hover:rotate-[15deg]">
            {getIcon()}
          </div>
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{getTooltipText()}</p>
      </TooltipContent>
    </Tooltip>
  );
}
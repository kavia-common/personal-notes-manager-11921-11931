"use client";

import { useState, useEffect } from "react";

// PUBLIC_INTERFACE
export default function SearchBar({
  defaultValue,
  onSearch,
  placeholder = "Search notes...",
}: {
  defaultValue?: string;
  onSearch: (q: string) => void;
  placeholder?: string;
}) {
  /** Minimal debounced search input. */
  const [value, setValue] = useState(defaultValue ?? "");

  useEffect(() => {
    const t = setTimeout(() => onSearch(value), 200);
    return () => clearTimeout(t);
  }, [value, onSearch]);

  return (
    <input
      className="input"
      aria-label="Search notes"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

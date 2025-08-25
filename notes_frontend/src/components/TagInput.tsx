"use client";

import { useState } from "react";

// PUBLIC_INTERFACE
export default function TagInput({
  tags,
  onChange,
  placeholder = "Add a tag and press Enter",
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  /** Simple tag input allowing addition/removal. */
  const [value, setValue] = useState("");

  const add = () => {
    const t = value.trim();
    if (!t) return;
    if (!tags.includes(t)) onChange([...tags, t]);
    setValue("");
  };

  const remove = (t: string) => {
    onChange(tags.filter((x) => x !== t));
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((t) => (
        <span key={t} className="tag">
          {t}
          <button
            className="ml-2 text-[10px] text-[var(--color-secondary)]"
            onClick={() => remove(t)}
            aria-label={`Remove ${t}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        className="input"
        style={{ maxWidth: 240 }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
      />
      <button className="btn" onClick={add} aria-label="Add tag">
        Add
      </button>
    </div>
  );
}
